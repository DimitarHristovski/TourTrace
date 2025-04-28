const BASE_URL = 'https://travel-advisor.p.rapidapi.com';

interface Location {
  location_id: string;
  name: string;
  latitude: number;
  longitude: number;
  location_string: string;
}

interface Attraction {
  location_id: string;
  name: string;
  description: string;
  location_string: string;
  rating: string;
  price_level: string;
  photo: {
    images: {
      large: {
        url: string;
      };
    };
  };
}

export const searchLocations = async (query: string): Promise<Location[]> => {
  try {
    console.log('Searching locations with query:', query);

    const response = await fetch(
      'https://api-d7b62b.stack.tryrelevance.com/latest/studios/49c74d53-a34d-4980-a41d-a6b8780d2ccb/trigger_webhook?project=e07a0393518d-4969-b912-f34c438e50dc',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    return data.map((item: any) => ({
      location_id: item.id || item.name,
      name: item.name,
      latitude: item.latitude || 0,
      longitude: item.longitude || 0,
      location_string: item.location || item.name
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};

export const getAttractions = async (locationId: string): Promise<Attraction[]> => {
  try {
    console.log('Fetching attractions for location:', locationId);

    const response = await fetch(
      'https://api-d7b62b.stack.tryrelevance.com/latest/studios/49c74d53-a34d-4980-a41d-a6b8780d2ccb/trigger_webhook?project=e07a0393518d-4969-b912-f34c438e50dc',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationId: locationId,
          type: 'attractions'
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    return data.map((item: any) => ({
      location_id: item.id || item.name,
      name: item.name,
      description: item.description || '',
      location_string: item.location || item.name,
      rating: item.rating || '',
      price_level: item.price_level || '',
      photo: {
        images: {
          large: {
            url: item.image_url || ''
          }
        }
      }
    }));
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
};

export const getRestaurants = async (locationId: string): Promise<Attraction[]> => {
  try {
    console.log('Fetching restaurants for location:', locationId);

    const response = await fetch(
      'https://api-d7b62b.stack.tryrelevance.com/latest/studios/49c74d53-a34d-4980-a41d-a6b8780d2ccb/trigger_webhook?project=e07a0393518d-4969-b912-f34c438e50dc',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationId: locationId,
          type: 'restaurants'
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    return data.map((item: any) => ({
      location_id: item.id || item.name,
      name: item.name,
      description: item.description || '',
      location_string: item.location || item.name,
      rating: item.rating || '',
      price_level: item.price_level || '',
      photo: {
        images: {
          large: {
            url: item.image_url || ''
          }
        }
      }
    }));
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}; 