import React, { useEffect, useState } from "react";

const ImageExist = ({ url }) => {
  const [check, setCheck] = useState(null);

  const checkImageExist = async () => {
    const response = await fetch(url);
    if (response.status === 200) setCheck(true);
    else setCheck(false);
  };

  useEffect(() => {
    checkImageExist();
  }, []);

  return (
    <img
      src={check ? url : "https://img.geliophoto.com/tashkent/00_tashkent.jpg"}
      className="card-img-top img-fluid"
      alt="image"
    />
  );
};

export default ImageExist;
