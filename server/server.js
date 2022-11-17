import axios from 'axios';

export default serverCall = async addressURL => {
  // console.log(addressURL);

  const data = await axios.get(addressURL);
  console.log('data' + JSON.stringify(data.data));
  return data;
};
