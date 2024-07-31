const API_BASE_URL = 'https://lab.pixel6.co/api';

export const verifyPAN = async (panNumber: string) => {
  const response = await fetch(`${API_BASE_URL}/verify-pan.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ panNumber }),
  });
  return response.json();
};

export const getPostcodeDetails = async (postcode: string) => {
  const response = await fetch(`${API_BASE_URL}/get-postcode-details.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postcode }),
  });
  return response.json();
};
