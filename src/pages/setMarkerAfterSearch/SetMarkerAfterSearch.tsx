import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SetMarkerAfterSearch.css";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import { AiOutlineLink } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdOutlineContentCopy } from "react-icons/md";

import { copyContentConteiner } from "../../utils/copyContentConteiner";
import { useJsApiLoader } from "@react-google-maps/api";

const SetMarkerAfterSearch = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAPS_API),
    libraries: ["drawing"],
  });
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("");
  const [myMap, setMyMap] = useState<google.maps.Map>();
  const [prevMarker, setPrevMarker] = useState<google.maps.Marker>();

  const redirectRoute = (routerName: string) => {
    navigate(`/${routerName}`);
  };

  const fetchAddressInMyMap = () => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results) {
        const myLatLng = {
          lat: results[0]?.geometry.location.lat(),
          lng: results[0]?.geometry.location.lng(),
        };

        myMap?.setCenter(myLatLng);
        myMap?.setZoom(16);
        prevMarker?.setMap(null);

        setPrevMarker(
          new google.maps.Marker({
            position: myLatLng,
            map: myMap,
            draggable: false,
            animation: google.maps.Animation.DROP,
          })
        );
      } else {
        alert(
          "Geocoder was not successfull for the followwing reason: " + status
        );
      }
    });
  };

  const initMap = () => {
    setMyMap(
      new google.maps.Map(
        document.getElementById("render-myMap") as HTMLElement,
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        }
      )
    );
  };

  const copyCod = () => {
    const conteinerWithCodContent: HTMLDivElement = document.getElementById(
      "cod-content"
    ) as HTMLDivElement;

    copyContentConteiner(conteinerWithCodContent);
  };

  useEffect(() => {    
    if(!isLoaded) return;
    initMap();
  }, [isLoaded]);

  return (
    <section className="geolocation">
      <h2>Busca com marcadores</h2>
      <p>
        Nesta seção vamos utilizar as duas ferramentas que foram abordadas
        anteriormente,{" "}
        <span onClick={() => redirectRoute("geocoding")}>
          Geocoding
          <AiOutlineLink />
        </span>{" "}
        e{" "}
        <span onClick={() => redirectRoute("marker")}>
          Marker
          <AiOutlineLink />
        </span>
        , para criar um mecanismo de busca integrado com um mapa.
      </p>
      <p>
        Vamos usar o <span>Geocoding</span> para realizar uma busca por um
        endereço qualquer e em seguida usar o retorno dessa busca para criar um
        novo <span>Marker</span> inserindo no{" "}
        <span onClick={() => redirectRoute("maps")}>
          Mapa
          <AiOutlineLink />
        </span>{" "}
        e redirecionando o mapa para o local em que o <span>Marker</span> foi
        inserido.
      </p>
      <p>
        O nosso objetivo é tornar a interação com o mapa mais dinâmica e
        permitir que o usuário possa navegar para qualquer lugar apenas
        pesquisando o nome de uma rua ou local. Observe o código a seguir:
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Mapa preexistente e já instanciado na DOM;
            </span>
          </div>
          <div>
            <span className="kwd">const </span>
            <span>[prevMarker, setPrevMarker] = </span>
            <span>useState&#40;</span>
            <span className="kwd">null</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// Ultimo Marker inserido no mapa;
            </span>
          </div>
          <div>
            <span className="kwd">const </span>
            <span>[address, setAddress] = </span>
            <span>useState&#40;</span>
            <span className="kwd">null</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Endereço digitado pelo usuário;
            </span>
          </div>
          <br />
          <div>
            <span className="kwd">function </span>
            <span> fetchAddressInMyMap&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>geocoder = </span>
            <span className="kwd">new </span>
            <span>google.maps.Geocoder&#40;&#41;;</span>
          </div>
          <br />
          <div>
            <span>&nbsp;&nbsp;&nbsp;geocoder.geocode&#40;&#123; </span>
            <span className="str">"address"</span>
            <span> : address &#125;, </span>
            <span> &#40; results, status &#41; =&gt; &#123;</span>
          </div>
          <div>
            <span className="typ">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if
            </span>
            <span> &#40; </span>
            <span> status === </span>
            <span className="str"> "OK" </span>
            <span>&#41; &#123;</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const
            </span>
            <span> myLatLng = &#123;</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lat
            </span>
            <span>: results</span>
            <span className="str">[</span>
            <span>0</span>
            <span className="str">]</span>
            <span>.geometry.location.</span>
            <span className="kwd">lat</span>
            <span>&#40;&#41;,</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lng
            </span>
            <span>: results</span>
            <span className="str">[</span>
            <span>0</span>
            <span className="str">]</span>
            <span>.geometry.location.</span>
            <span className="kwd">lng</span>
            <span>&#40;&#41;,</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;;
            </span>
          </div>
          <br />
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;myMap
            </span>
            <span>?.setCenter&#40;</span>
            <span className="lit">myLatLng</span>
            <span>&#41;;</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;myMap
            </span>
            <span>?.setZoom&#40;</span>
            <span className="lit">16</span>
            <span>&#41;;</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prevMarker
            </span>
            <span>?.setMap&#40;</span>
            <span className="kwd">null</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Remove o ultimo Marker do mapa;
            </span>
          </div>
          <br />
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setPrevMarker&#40;
            </span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new
            </span>
            <span>&nbsp;google.maps.</span>
            <span className="typ">Marker</span>
            <span>&#40;&#123;</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;position
            </span>
            <span>: </span>
            <span className="lit">myLatLng</span>
            <span>,</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map
            </span>
            <span>: </span>
            <span className="lit">myMap</span>
            <span>,</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;draggable
            </span>
            <span>: </span>
            <span className="kwd">false</span>
            <span>,</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;animation
            </span>
            <span>: </span>
            <span>google.maps.Animation.DROP</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Cria uma animação ao inserir o Marker no
              mapa;
            </span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;&#41;
            </span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#41;;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>
            <span className="typ"> else </span>
            <span> &#123;</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alert&#40;
            </span>
            <span className="str">
              "Geocoder was not successfull for the followwing reason: "
            </span>
            <span> + status&#41;;</span>
          </div>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&#125;&#41;;</span>
          </div>
          <div>
            <span className="typ">&#125;</span>
          </div>
        </div>
      </aside>
      <p>
        Agora vamos entender o que está acontecendo na função acima dividindo o
        código em "etapas".
      </p>
      <p>
        <strong>Primeiro:</strong> criamos uma instância do{" "}
        <span>Geocoding</span> e iniciamos a busca pelo endereço desejado;
      </p>
      <p>
        <strong>Segundo:</strong> inserimos uma estrutura condicional{" "}
        <span>if</span> para validar se o resultado da busca foi OK, dessa forma
        seguimos com a manipulação do mapa apenas mediante o sucesso da busca;
      </p>
      <p>
        <strong>Terceiro:</strong> com o resultado da busca, criamos uma
        constante que nada mais é que um objeto contendo a latitude e a
        longitude que representam o local exato digitado pelo usuário;
      </p>
      <p>
        <strong>Quarto:</strong> recentralizamos o mapa para o local da busca e
        definimos um zoom adequado;
      </p>
      <p>
        <strong>Quinto:</strong> usamos uma função do Objeto <span>Marker</span>{" "}
        para remover o ultimo Marcador inserido do mapa, dessa forma a cada
        busca o marcador anterior é removido antes que o novo seja inserido;
      </p>
      <p>
        <strong>Sexto:</strong> criamos um novo <span>Marker</span> e inserimos
        ele dentro do nosso mapa. Observe que desta vez definimos um atributo
        que cria uma animação ao inserir o Marcador no mapa.
      </p>
      <p>
        Vamos ver na prática agora? Digite um endereço ou local e clique no
        botão de busca para visualizar o resultado do código que acabamos de ver
        juntos no mapa.
      </p>
      <div className="input-fetch-address">
        <Input
          type="text"
          placeholder="Buscar endereço"
          handleOnChange={(value) => setAddress(value)}
        />
        <Button
          text="Buscar"
          style="button-primary"
          handleClick={fetchAddressInMyMap}
        >
          <CiSearch />
        </Button>
      </div>
      <div className="render-myMap" id="render-myMap"></div>
      <div className="font-documentation"></div>
    </section>
  );
};

export default SetMarkerAfterSearch;
