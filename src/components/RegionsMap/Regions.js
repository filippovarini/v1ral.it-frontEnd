import React, { Component } from "react";

export class Regions extends Component {
  render() {
    return (
      <div>
        <map id="Map" name="Map">
          <img
            id="mappaitalia"
            alt=""
            src="https://www.weweb.in/data/2013/10/cartina_italia.png"
            usemap="#Map"
            name="Italia"
          />
          <area
            title="Val d'Aosta"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Aosta.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Val d'Aosta"
            coords="61,53,62,65,56,67,37,69,35,61,30,55,38,52,41,55,50,53,54,49"
            shape="poly"
            href="#"
          />
          <area
            title="Piemonte"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Piemonte.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Piemonte"
            coords="84,75,80,75,78,82,87,91,89,91,97,108,88,104,88,108,86,110,79,107,79,110,68,108,57,125,51,126,50,122,30,119,28,106,31,106,31,102,35,102,34,94,28,94,27,87,24,83,39,80,39,70,55,66,55,69,61,68,63,58,62,52,71,45,71,41,68,41,68,39,76,33,77,33,77,34,77,42,79,42,85,52,81,61,87,74,85,78,84,78,94,109,96,109,96,110"
            shape="poly"
            href="#"
          />
          <area
            title="Lombardia"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Lombardia.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Lombardia"
            coords="138,37,139,47,135,51,136,61,141,62,144,60,144,64,141,78,160,96,150,96,138,94,134,97,118,87,103,89,100,104,98,104,87,88,84,90,79,78,83,76,85,80,89,72,82,57,86,51,87,53,92,60,94,60,96,54,94,51,103,40,102,32,106,32,114,42,122,38,122,43,127,45,128,42,124,31,129,28,142,35,142,37"
            shape="poly"
            href="#"
          />
          <area
            title="Trentino"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Trentino.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Trentino"
            coords="170,49,170,54,169,54,163,52,154,65,149,65,141,59,138,60,137,51,139,38,143,38,143,34,134,23,142,19,152,23,161,15,185,10,185,11,186,11,183,18,190,28,189,28,186,29,182,27,177,32,173,32,173,43,178,45,177,47"
            shape="poly"
            href="#"
          />
          <area
            title="Veneto"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Veneto.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Veneto"
            coords="184,81,181,83,192,98,188,99,170,95,168,98,161,96,161,93,141,77,141,69,147,60,148,67,155,66,167,53,171,56,171,50,177,49,179,44,174,39,176,33,184,28,201,29,201,30,189,45,193,50,191,57,201,63,207,61,209,67,189,72"
            shape="poly"
            href="#"
          />
          <area
            title="Friuli"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Friuli.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Friuli"
            coords="226,32,226,35,217,44,225,47,224,49,220,55,233,69,226,70,224,63,218,66,209,63,205,60,198,63,192,55,194,46,190,42,191,42,191,41,194,41,194,37,202,30,213,33"
            shape="poly"
            href="#"
          />
          <area
            title="Liguria"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Liguria.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Liguria"
            coords="121,132,118,131,118,130,116,130,116,129,113,131,113,130,102,120,101,118,95,118,94,116,91,116,91,115,89,115,89,114,79,114,68,125,60,136,57,136,46,138,45,134,51,130,52,127,63,125,64,121,65,121,65,117,69,114,69,110,70,110,80,111,80,108,83,108,83,111,84,111,84,112,87,112,89,109,89,105,90,105,94,110,96,109,106,110,106,111,103,116,104,116,104,117,109,117,112,121"
            shape="poly"
            href="#"
          />
          <area
            title="Emilia"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Emilia.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Emilia"
            coords="120,90,120,88,122,89,123,92,128,92,130,93,130,95,138,98,150,98,150,97,164,97,165,99,171,97,171,96,186,98,187,102,185,103,187,119,187,123,189,124,189,126,191,127,191,129,199,135,199,139,198,140,190,139,190,136,188,136,188,135,182,138,182,140,181,140,181,144,177,144,169,133,171,129,167,128,167,127,164,127,163,125,156,126,154,130,148,129,146,130,146,129,144,129,143,127,137,128,132,122,128,122,127,120,122,119,122,117,115,113,112,118,111,118,111,117,110,115,105,116,105,115,104,115,104,114,107,109,98,108,98,105,101,105,103,97,105,90,105,89,108,89,108,88,112,91,114,90,116,91"
            shape="poly"
            href="#"
          />
          <area
            title="Toscana"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Toscana.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Toscana"
            coords="169,130,167,136,173,143,175,143,176,145,185,147,181,155,178,157,179,159,183,163,181,164,181,165,178,165,178,166,174,168,175,172,176,172,175,180,172,181,170,182,170,189,164,193,165,197,161,198,161,199,151,200,152,191,140,183,140,177,139,176,132,174,133,159,132,159,132,157,127,153,127,138,126,138,126,136,122,133,122,128,120,127,113,118,114,118,118,114,122,121,126,121,127,123,132,124,136,129,142,128,142,129,146,132,148,132,149,130,155,131,155,130,162,126"
            shape="poly"
            href="#"
          />
          <area
            title="Marche"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Marche.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Marche"
            coords="215,185,215,182,214,182,214,181,211,181,211,180,205,178,204,176,204,167,203,167,203,163,202,163,201,156,197,156,197,157,196,157,196,156,189,153,190,150,185,150,185,149,188,145,182,144,184,138,188,137,188,138,189,138,189,141,192,141,195,139,195,140,199,142,199,141,200,141,200,137,201,137,201,136,203,136,210,144,212,144,217,150,223,151,224,153,225,153,225,155,226,155,227,159,228,159,228,164,229,164,229,167,230,167,230,169,231,169,231,173,232,173,233,179,227,182,227,183,223,182,223,183,217,186"
            shape="poly"
            href="#"
          />
          <area
            title="Umbria"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Umbria.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Umbria"
            coords="187,151,187,154,194,156,195,158,199,158,199,159,200,159,201,164,202,164,202,169,203,169,204,178,204,179,208,179,208,180,213,182,210,190,205,190,205,191,200,195,200,197,192,200,192,198,186,196,185,189,184,189,184,188,180,188,180,189,177,189,176,176,178,176,176,169,184,165,180,159,180,157,182,157,183,152,184,151"
            shape="poly"
            href="#"
          />
          <area
            title="Lazio"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Lazio.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Lazio"
            coords="171,183,175,183,176,184,177,188,176,188,176,190,184,190,185,197,192,200,192,201,195,201,201,198,204,192,211,191,216,186,218,191,212,191,210,197,211,202,213,203,216,210,214,210,213,208,209,208,206,212,207,216,212,217,213,219,217,219,217,224,222,225,222,226,229,225,230,227,233,227,234,229,237,236,234,238,233,238,233,244,225,246,225,247,223,248,223,247,221,245,219,245,219,244,211,245,210,247,209,247,209,246,199,239,199,238,196,238,196,236,195,236,195,235,195,234,192,232,192,231,190,231,189,229,188,229,186,226,183,226,182,219,179,218,179,217,177,217,176,215,171,215,171,214,170,214,170,211,168,210,168,207,167,207,167,204,166,204,165,202,163,202,162,199,165,199,167,195,166,193,170,192"
            shape="poly"
            href="#"
          />{" "}
          <area
            title="Abruzzo"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Abruzzo.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Abruzzo"
            coords="234,181,237,190,239,191,239,193,241,194,241,195,246,197,246,199,251,203,252,205,254,205,255,207,258,207,258,208,260,213,251,224,251,222,246,218,243,219,242,226,230,225,229,223,226,224,219,223,219,222,218,222,218,218,208,214,208,211,212,209,216,212,217,206,214,202,212,201,214,198,212,197,212,193,218,193,222,187,223,183,227,185,227,184"
            shape="poly"
            href="#"
          />
          <area
            title="Molise"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Molise.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Molise"
            coords="265,230,266,236,257,238,256,240,249,236,240,236,240,239,237,238,238,228,243,228,243,222,245,220,247,221,249,221,249,224,250,224,250,225,254,225,261,213,264,214,264,215,266,215,266,216,270,216,270,217,271,228"
            shape="poly"
            href="#"
          />{" "}
          <area
            title="Campania"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Campania.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Campania"
            coords="276,244,275,250,277,252,286,256,285,258,279,260,281,268,283,269,283,272,285,273,285,277,286,277,290,279,293,286,292,286,290,291,284,294,284,295,281,295,275,290,274,288,271,288,270,286,267,283,270,278,269,278,263,267,259,268,259,270,251,271,251,272,250,272,250,271,249,270,253,264,252,263,244,262,244,263,240,263,239,258,238,258,238,256,236,255,236,252,235,252,231,247,235,240,234,239,235,239,235,238,240,241,240,240,241,240,241,237,250,238,251,240,255,241,255,242,257,240,266,238,267,236,269,237,270,237,270,242,271,242,271,243"
            shape="poly"
            href="#"
          />
          <area
            title="Puglia"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Puglia.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Puglia"
            coords="363,268,371,272,377,278,378,282,379,282,376,297,366,294,364,291,364,284,363,284,363,282,362,282,359,279,348,280,347,278,345,278,345,277,340,276,340,272,332,271,326,275,323,272,324,270,324,266,323,266,316,262,312,264,307,257,301,257,301,256,300,256,300,251,298,251,297,249,290,250,290,251,278,251,276,247,278,244,276,242,271,239,272,239,272,236,267,235,267,231,270,231,273,225,272,225,273,218,274,218,274,219,281,219,281,218,284,218,284,217,303,216,304,222,295,233,305,239,309,240,309,241,311,241,311,242,320,244,320,245,322,245,322,246,335,249,337,252,339,252,342,256,344,256,345,258,347,258,348,260,354,260,355,262,357,262,357,263,362,266"
            shape="poly"
            href="#"
          />
          <area
            title="Basilicata"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Basilicata.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Basilicata"
            coords="327,276,322,289,313,288,312,297,303,297,303,296,297,293,293,296,293,295,291,290,295,284,291,278,286,271,284,271,280,261,287,258,287,252,297,251,300,258,306,258,307,261,308,261,312,266,315,266,321,264,322,268,323,268,323,269,322,269"
            shape="poly"
            href="#"
          />
          <area
            title="Calabria"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Calabria.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Calabria"
            coords="314,290,320,290,321,295,320,295,320,298,319,298,319,300,318,300,318,307,319,308,330,313,335,313,339,317,340,334,331,335,331,336,327,337,327,338,321,343,321,349,322,349,323,356,322,356,315,362,312,366,310,367,309,372,308,372,308,377,302,378,294,378,294,367,297,366,298,362,300,361,302,352,299,351,299,349,308,347,312,339,308,337,308,334,306,333,306,330,305,330,305,321,304,321,303,317,299,314,298,309,297,309,296,305,295,305,295,299,294,297,297,296,297,295,302,298,313,298,314,297"
            shape="poly"
            href="#"
          />
          <area
            title="Sicilia"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Sicilia.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Sicilia"
            coords="281,407,281,412,285,414,282,421,279,422,278,431,276,430,263,430,263,429,258,428,250,415,237,415,230,412,230,410,228,408,226,408,226,407,222,407,220,404,218,404,214,399,210,399,208,396,198,397,197,395,195,395,195,394,191,392,191,382,191,378,192,378,201,373,201,376,202,376,202,377,208,377,213,371,216,371,216,370,218,369,218,370,219,370,220,373,222,373,222,374,226,374,227,377,236,380,242,376,242,377,244,377,244,378,256,377,256,376,262,375,264,372,266,372,266,371,269,371,269,370,278,372,281,368,286,368,286,367,288,367,288,366,291,365,291,369,287,377,285,378,282,387,281,387,281,389,280,389,279,394,278,394,278,396,277,396,276,404"
            shape="poly"
            href="#"
          />
          <area
            title="Sardegna"
            onmouseover="document.Italia.src='https://www.weweb.in/data/2013/10/Sardegna.png';"
            onmouseout="document.Italia.src='https://www.weweb.in/data/2013/10/cartina_italia.png';"
            alt="Sardegna"
            coords="89,244,102,252,101,257,103,258,108,274,106,278,104,279,104,280,102,281,102,283,101,283,100,288,104,296,102,311,101,311,101,313,100,313,100,327,98,327,92,327,81,327,81,328,80,328,80,336,79,336,78,337,77,337,77,338,73,339,73,338,67,338,60,325,61,316,63,315,63,305,67,305,68,298,67,298,67,297,63,297,63,292,66,290,66,280,63,278,62,270,58,270,57,261,58,261,58,257,69,261,71,258,73,258,73,257,77,257,79,254,80,254,82,250"
            shape="poly"
            href="#"
          />{" "}
        </map>
      </div>
    );
  }
}

export default Regions;
