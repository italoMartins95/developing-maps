import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Marker.css";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

import { BiSolidMap } from "react-icons/bi";
import { RxGlobe } from "react-icons/rx";
import { AiOutlineLink } from "react-icons/ai";
import { MdOutlineContentCopy } from "react-icons/md";
import { copyContentConteiner } from "../../utils/copyContentConteiner";

import { useJsApiLoader } from "@react-google-maps/api";

const Marker = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAPS_API),
    libraries: ["drawing"],
  });

  const navigate = useNavigate();
  const [myMap, setMyMap] = useState<google.maps.Map>();

  const [lat, setLat] = useState<number>(-34.397);
  const [lng, setLng] = useState<number>(150.644);

  const insertMarker = () => {
    const myLatLng = { lat, lng };

    new google.maps.Marker({
      position: myLatLng,
      map: myMap,
      draggable: false,
    });

    myMap?.setCenter(myLatLng);
    myMap?.setZoom(14);
  };

  const initMap = () => {
    setMyMap(
      new google.maps.Map(
        document.getElementById("render-myMap") as HTMLElement,
        {
          center: { lat, lng },
          zoom: 8,
        }
      )
    );
  };

  const runToGeocoding = () => {
    navigate("/geocoding");
  };

  const copyCod = () => {
    const conteinerWithCodContent: HTMLDivElement = document.getElementById(
      "cod-content"
    ) as HTMLDivElement;

    copyContentConteiner(conteinerWithCodContent);
  };

  useEffect(() => {
    if (!isLoaded) return;
    initMap();
  }, [isLoaded]);

  return (
    <section className="markers">
      <h2>Marker's</h2>
      <p>
        Um Marcador é uma ferramenta que indica uma localização dentro de um
        mapa, e adicionar Marcadores em mapas não é algo muito dificil a se
        fazer.
      </p>
      <p>
        Para adicionar Marcadores no mapa podemos utilizar o construtor{" "}
        <span>google.maps.Marker</span> para criar um Objeto do tipo{" "}
        <span>Marker</span> e posteriormente inseri lo em um mapa.
      </p>
      <p>
        Objetos do tipo <span>Marker</span> possuem muitos atributos que
        permitem a personalização dos marcadores, mas em nosso caso de estudo
        vamos utilizar apenas três atributos para facilitar as coisas por
        enquanto. Observe o exemplo no código a seguir:
      </p>
      <aside className="image-cod">
        <span className="btn-copy" onClick={copyCod}>
          <MdOutlineContentCopy />
        </span>
        <div id="cod-content">
          <div>
            <span className="kwd">const </span>
            <span>[myMap, setMyMap] = </span>
            <span>useState&#40;</span>
            <span className="kwd">null</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// Mapa preexistente e já instanciado na
              DOM;
            </span>
          </div>
          <br />
          <div>
            <span className="kwd">function </span>
            <span> setNewMarker&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Latitude e Longitude que representam a
              posição exata em que o Marcador será inserido no mapa;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>myLatLng = &#123; lat: </span>
            <span className="lit">-25.363 </span>
            <span>, lng: </span>
            <span className="lit"> 131.044 </span>
            <span>&#125;;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;new </span>
            <span>google.maps.</span>
            <span className="typ">Marker</span>
            <span>&#40;&#123;</span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;position: </span>
            <span className="lit">myLatLng</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Define a posição em
              que o Marcador será inserido no mapa
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map: </span>
            <span className="lit">myMap</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Define em que mapa o Marcador será inserido
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;draggable: </span>
            <span className="kwd">false</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Define se
              o Marcador pode ser "arrastado" no mapa
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&#125;&#41;;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;myMap</span>
            <span>.setCenter&#40;</span>
            <span className="lit">myLatLng</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Redefine o centro do mapa, posicionando o
              Marcador no centro da tela
            </span>
          </div>
          <div>
            <span className="typ">&#125;</span>
          </div>
        </div>
      </aside>
      <p>
        Agora vamos observar o código acima em ação com uma pequena diferença.
        Você poderá definir as coordenadas que utilzazemos para criar o Marcador
        por meio dos Inputs abaixo. Em seguida clique no botão ao lado para
        visualizar o resultado.
      </p>
      <div className="input-coordinates">
        <div>
          <Input
            type="number"
            placeholder="Latitude"
            handleOnChange={(value) => setLat(Number(value))}
          />
          <Input
            type="number"
            placeholder="Longitude"
            handleOnChange={(value) => setLng(Number(value))}
          />
        </div>
        <Button
          text="Inserir"
          style="button-primary"
          handleClick={insertMarker}
        >
          <BiSolidMap />
        </Button>
      </div>
      <div className="render-myMap" id="render-myMap"></div>
      <p>
        Nesta seção aprendemos como definir Marcadores usando Coordenadas para
        definir o posicionamento desejado. Mas essa não é uma forma eficiente da
        perspectiva do usuário pois dificilmente alguém vai ficar decorando
        coordenadas pra dizer onde está ou para onde vai.
      </p>
      <p>
        Na seção anterior aprendemos como fazer buscas usando o{" "}
        <span className="link" onClick={runToGeocoding}>
          Geocoding
          <AiOutlineLink />
        </span>{" "}
        apenas declarando o nome da rua ou local desejado para realizar a busca.
        Que tal usar essa ferramenta para auxiliar a criação dos nossos{" "}
        <span>Marker's</span> ? Na próxima seção vamos combinar essas duas
        ferramentas para otimizar o nosso Mapa, criando uma ferramenta de busca
        inteligente e rápida.
      </p>
      <a
        className="font-documentation"
        href="https://developers.google.com/maps/documentation/javascript/markers?hl=pt-br"
        target="_blanck"
      >
        <span>Fonte</span>
        <RxGlobe />
      </a>
    </section>
  );
};

export default Marker;
