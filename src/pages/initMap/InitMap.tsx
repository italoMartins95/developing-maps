import { useState } from "react";
import "./InitMap.css";

import Button from "../../components/button/Button";

import { LiaMapSolid } from "react-icons/lia";
import { RxGlobe } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";

import { copyContentConteiner } from "../../utils/copyContentConteiner";

const InitMap = () => {
  const [myMap, setMyMap] = useState<google.maps.Map>();

  const initMap = () => {
    const renderMyMapHtmlConteiner: HTMLElement = document.getElementById(
      "render-myMap"
    ) as HTMLElement;

    if (myMap) {
      scrollToConteiner(renderMyMapHtmlConteiner);
      return;
    }

    renderMyMapHtmlConteiner.classList.add("myMap-renderer");

    const map = new google.maps.Map(renderMyMapHtmlConteiner, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    setMyMap(map);

    setTimeout(() => {
      scrollToConteiner(renderMyMapHtmlConteiner);
    }, 600);
  };

  const scrollToConteiner = (conteiner: HTMLElement) => {
    conteiner.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const copyCod = () => {
    const conteinerWithCodContent: HTMLDivElement = document.getElementById(
      "cod-content"
    ) as HTMLDivElement;

    copyContentConteiner(conteinerWithCodContent);
  };

  return (
    <section className="start-new-map">
      <h2>Instanciando um novo mapa com GoogleMap</h2>
      <p>
        Criar mapas com o GoogleMaps Plataform é bem simples. Para começar a
        criar nossos mapas, vamos utilizar um Objeto do tipo{" "}
        <span>google.maps.Map</span> disponibilizado pelo Google e definir 3
        itens importantes:
      </p>
      <ul>
        <li>O conteiner em que o mapa será exibido;</li>
        <li>
          Onde será o centro do mapa usando coordenadas de geolocalização
          (latitude e longitude);
        </li>
        <li>O zoom inicial do mapa.</li>
      </ul>
      <p>Observe o código a seguir e veja como isso é feito na prática:</p>
      <aside className="image-cod">
        <span className="btn-copy" onClick={copyCod}>
          <MdOutlineContentCopy />
        </span>
        <div id="cod-content">
          <div>
            <span className="kwd">let </span>
            <span>map: </span>
            <span> google.maps.</span>
            <span className="typ">Map</span>
            <span>;</span>
          </div>
          <br />
          <div>
            <span className="kwd"> function </span>
            <span> initMap&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;map = </span>
            <span className="kwd">new </span>
            <span>google.maps.Map</span>
            <span>&#40;</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.getElementById&#40;
            </span>
            <span className="str">"render-myMap"</span>
            <span>&#41;</span>
            <span> as </span>
            <span className="typ">HTMLElement, </span>
            <span className="str">
              &nbsp;&nbsp;// indica o conteiner onde o mapa será exibido
            </span>
          </div>
          <div className="typ">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;center:
            </span>
            <span className="typ"> &#123; </span>
            <span> lat: </span>
            <span className="lit">-34.397</span>
            <span>, lng: </span>
            <span className="lit">150.644</span>
            <span className="typ"> &#125;,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// indica a posição em que o mapa
              será centralizado
            </span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;zoom:{" "}
            </span>
            <span className="lit">8</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              indica o zoom inicial do mapa
            </span>
          </div>
          <div>
            <span className="typ">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&#41;;</span>
          </div>
          <div>
            <span className="typ">&#125;</span>
          </div>
          <br />
          <div>
            <span>initMap&#40;&#41;;</span>
          </div>
        </div>
      </aside>
      <aside className="button-area">
        <p>
          Após executar essa simples função, um novo mapa será exibido dentro da
          Div indicada e no local definido. Clique no botão para executar o
          código e visualize o resultado em seguida!
        </p>
        <Button
          text="InitMap"
          style="button-primary"
          disabled={myMap ? true : false}
          handleClick={initMap}
        >
          <LiaMapSolid />
        </Button>
      </aside>
      <aside id="render-myMap" className="render-myMap"></aside>
      <a
        className="font-documentation"
        href="https://developers.google.com/maps/documentation/javascript/overview?hl=pt-br"
        target="_blanck"
      >
        <span>Fonte</span>
        <RxGlobe />
      </a>
    </section>
  );
};

export default InitMap;
