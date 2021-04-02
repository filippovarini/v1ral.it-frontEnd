import React from "react";

import shopDescriptionImg from "../../images/user-step1.png";
import it from "../../locales/it.json";

const ShopPageDescription = () => {
  return (
    <div className="page-description box flex-line">
      <div className="page-description-textes">
        <p className="page-description-header">
          {it.shops_page_description_header}
        </p>
        <p className="page-description-text">
          {it.shops_page_description_text}
        </p>
      </div>
      <img
        src={shopDescriptionImg}
        alt="descrizione della pagina"
        className="page-description-img"
      />
    </div>
  );
};

export default ShopPageDescription;
