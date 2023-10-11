import { phone_codes } from '@/constants/phoneCodes';
import { useState, useEffect } from 'react';

interface PhoneCode {
  name: string;
  dial_code: string;
  code: string;
};

type UsePhoneCodeResult = [ PhoneCode | undefined, string | undefined];

const usePhoneCode = (): UsePhoneCodeResult => {
  const [phoneCode, setPhoneCode] = useState<PhoneCode>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };

    const successHandler = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        localityLanguage: 'en',
      });

      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => {
          const countryCode = data.countryCode;
          const phoneCode = phone_codes[countryCode];

          if (!phoneCode) {
            setError('Phone code not found for country.');
          } else {
            setPhoneCode(phoneCode);
          }
        })
        .catch((error) => {
          setError(`Error fetching phone code: ${error.message}`);
        });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(`Error getting location: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
  }, []);

  return [phoneCode, error];
};

export default usePhoneCode;
