import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

const AutoTourPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiResponse = await fetch(
        'https://api-d7b62b.stack.tryrelevance.com/latest/studios/49c74d53-a34d-4980-a41d-a6b8780d2ccb/trigger_webhook?project=e07a0393518d-4969-b912-f34c438e50dc',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city_name: city })
        }
      );

      if (!apiResponse.ok) {
        throw new Error(`API request failed with status ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      console.log('API Response:', data);
      setResponse(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            City Explorer
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Discover information about any city
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4  pt-20 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City Name
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter a city name"
                required
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  Search
                </>
              )}
            </button>
          </form>

          {response && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">City Information</h2>
              <div className="space-y-6">
                {Array.isArray(response) ? (
                  response.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(item).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600 mb-3 capitalize">
                              {key.replace(/_/g, ' ')}
                            </h3>
                            {typeof value === 'object' && value !== null ? (
                              <div className="space-y-2">
                                {Object.entries(value).map(([subKey, subValue]) => (
                                  <div key={subKey} className="flex items-start">
                                    <span className="font-medium text-gray-700 min-w-[120px] capitalize">
                                      {subKey.replace(/_/g, ' ')}:
                                    </span>
                                    <span className="text-gray-600 ">
                                      {String(subValue)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-600">{String(value)}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(response).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-blue-600 mb-3 capitalize">
                            {key.replace(/_/g, ' ')}
                          </h3>
                          {typeof value === 'object' && value !== null ? (
                            <div className="space-y-2">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <div key={subKey} className="flex items-start">
                                  <span className="font-medium text-gray-700 min-w-[120px] capitalize">
                                    {subKey.replace(/_/g, ' ')}:
                                  </span>
                                  <span className="text-gray-600 ml-2">
                                    {String(subValue)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600">{String(value)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoTourPage;