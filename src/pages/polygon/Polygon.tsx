import { useEffect, useState } from "react";

import "./Polygon.css";

import imagePoligon from "../../images/polygon.png";
import check from "../../images/icons/check.svg";

import Button from "../../components/button/Button";

import { MdOutlineContentCopy } from "react-icons/md";
import { MdDataArray } from "react-icons/md";
import { TbScribble } from "react-icons/tb";
import { GrClearOption } from "react-icons/gr";
import { RxGlobe } from "react-icons/rx";

import { copyContentConteiner } from "../../utils/copyContentConteiner";
import { createInteractiveView } from "../../utils/createConteinerObjectFormat";

import { useJsApiLoader } from "@react-google-maps/api";

const Polygon = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAPS_API),
    libraries: ["drawing"],
  });

  const [myMap, setMyMap] = useState<google.maps.Map>();
  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager>();
  const [prevPolygon, setPrevPolygon] = useState<google.maps.Polygon>();
  const [coordinates, setCoordinates] = useState<google.maps.LatLng[]>([]);
  const [viewCoordinates, setViewCoordinates] = useState<boolean>(false);

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

  const createDrawingManager = () => {
    if (drawingManager) {
      console.log("O drawingManager já foi criado!");

      return;
    }

    const newDrawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
    });

    setListnerInDrawingManager(newDrawingManager);
    setDrawingManager(newDrawingManager);

    if (myMap) {
      newDrawingManager.setMap(myMap);
      showInsertDrawinManagerCompleteMessage();
    }
  };

  const setListnerInDrawingManager = (
    drawingManager: google.maps.drawing.DrawingManager
  ) => {
    google.maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      (polygon: google.maps.Polygon) => {
        const coordinates: google.maps.LatLng[] = polygon
          .getPath()
          .getArray()
          .map((coordinates) => {
            return coordinates;
          });

        setPrevPolygon(polygon);
        setCoordinates(coordinates);

        drawingManager.setMap(null);
      }
    );
  };

  const showInsertDrawinManagerCompleteMessage = () => {
    const windowMessage = document.createElement("div");
    windowMessage.setAttribute("class", "window-message");

    const modalConfirm = document.createElement("div");
    modalConfirm.setAttribute("class", "popup-confirm");

    const svgIcon = document.createElement("img");
    svgIcon.setAttribute("src", check);

    const handleClickButton = () => {
      if (myMap) {
        myMap.controls[google.maps.ControlPosition.TOP_LEFT].removeAt(0);
      }
    };

    const buttonConfirm = document.createElement("button");
    buttonConfirm.setAttribute("class", "btn-primary");
    buttonConfirm.innerText = "Fechar";

    buttonConfirm.addEventListener("click", () => {
      handleClickButton();
    });

    modalConfirm.appendChild(svgIcon);
    modalConfirm.insertAdjacentHTML(
      "beforeend",
      "DrawingManager adicionado ao mapa!"
    );
    modalConfirm.appendChild(buttonConfirm);

    windowMessage.appendChild(modalConfirm);

    if (myMap) {
      myMap.controls[google.maps.ControlPosition.TOP_LEFT].push(windowMessage);
    }
  };

  const removePrevPolygonAndReinsertDrawingManager = () => {
    prevPolygon?.setMap(null);
    setCoordinates([]);

    if (myMap) {
      drawingManager?.setMap(myMap);
    }
  };

  const showArrayCoordinates = () => {
    setViewCoordinates(!viewCoordinates);

    setTimeout(() => {
      const arrayConteinerHtml: HTMLDivElement = document.getElementById(
        "content-array"
      ) as HTMLDivElement;

      createInteractiveView(
        JSON.parse(JSON.stringify(coordinates)),
        arrayConteinerHtml
      );
    }, 300);
  };

  const copyCod = (idConteiner: string) => {
    const conteinerWithCodContent: HTMLDivElement = document.getElementById(
      idConteiner
    ) as HTMLDivElement;

    copyContentConteiner(conteinerWithCodContent);
  };

  useEffect(() => {    
    if(!isLoaded) return;
    initMap();
  }, [isLoaded]);

  return (
    <section className="polygon">
      <h2>Polygons</h2>
      <p>
        Este é o ultimo tema deste tutorial e agora vamos abordar uma ferramenta
        um pouco mais complexa que são os Objetos <span>Polygons</span>. Um{" "}
        <span>Polygon</span> é literalmente um polígono, uma forma geométrica
        que pode ter três lados ou mais.
      </p>
      <p>
        Podemos usar essa ferramenta na criação de poligonos complexos para
        demarcar regiões em cidades ou empresas com o objetivo de "setorizar" um
        mapa com diversas regiões onde cada poligono, com suas respectivas cores
        diferente, representam um território delimitado.
      </p>
      <aside className="polygon-image">
        <div className="only-text">
          <p>
            Na imagem ao lado temos o Triângulo das Bermudas demarcado por um
            polígono formado por três seguimentos de reta que conectam três
            pontos entre sí. Para nós o mais importante nesse triângulo são os
            três pontos, pois os pontos são utilizados como uma base para a
            criação dos Poligonos.
          </p>
          <p>
            Como o nosso objetivo aqui é criar poligonos em mapas, vamos definir
            esses pontos com um conjunto de{" "}
            <strong>coordenadas geográficas</strong>. Com isso em mente,
            chegamos a conclusão que para formar esse triangulo precisamos de um
            conjunto com seis coordenadas:{" "}
            <strong>
              [ &#123; latitude 1, longitude 1 &#125; ; &#123; latitude 2 ,
              longitude 2 &#125; ; &#123; latitude 3 , longitude 3 &#125; ]
            </strong>
            .
          </p>
          <p>
            Talvez agora você esteja começando a entender o conceito da criação
            de Polígonos. Básicamente se trata de um conjunto de{" "}
            <strong>coordenadas geográficas</strong> que juntas formam um
            caminho que permite a criação do poligono.
          </p>
        </div>
        <div className="text-image">
          <img src={imagePoligon} alt="triângulo" />
        </div>
      </aside>
      <p>
        Agora vamos ver como criar um Objeto <span>Polygon</span> na prática com
        o código abaixo:
      </p>
      <aside className="image-cod">
        <span className="btn-copy" onClick={() => copyCod("cod-content")}>
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
            <span> setNewPolygon&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Define o conjunto de coordenadas geográficas
              que formam o caminho que desenha o triângulo;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>triangleCoords = [ </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; </span>
            <span>lat: </span>
            <span className="lit">25.774</span>
            <span>, lng: </span>
            <span className="lit">-80.19 </span>
            <span>&#125;,</span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; </span>
            <span>lat: </span>
            <span className="lit">18.466</span>
            <span>, lng: </span>
            <span className="lit">-66.118 </span>
            <span>&#125;,</span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; </span>
            <span>lat: </span>
            <span className="lit">32.321</span>
            <span>, lng: </span>
            <span className="lit">-64.757 </span>
            <span>&#125;,</span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;];</span>
          </div>
          <br />
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Instancia um novo Objeto do tipo Polygon;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>bermudaTriangle = </span>
            <span className="kwd">new </span>
            <span>google.maps.</span>
            <span className="typ">Polygon</span>
            <span>&#40;&#123;</span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paths: </span>
            <span className="lit">triangleCoords</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// Define o caminho do poligono com base
              no Array de coordenadas
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;strokeColor: </span>
            <span className="str">"#FF0000"</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Define a cor do contorno;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;strokeOpacity: </span>
            <span className="lit">0.8</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Define a opacidade do
              contorno;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;strokeWeight: </span>
            <span className="lit">2</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Define a largura do contorno;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fillColor: </span>
            <span className="str">"#FF0000"</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Define a cor do preenchimento;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fillOpacity: </span>
            <span className="lit">0.35</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Define
              opacidade do preenchimento;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&#125;&#41;;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;bermudaTriangle</span>
            <span>.setMap&#40;</span>
            <span className="lit">myMap</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Inseri o Poligono dentro do mapa;
            </span>
          </div>
          <div>
            <span className="typ">&#125;</span>
          </div>
        </div>
      </aside>
      <p>
        A manipulação de Objetos do tipo <span>Polygon</span> nos permite
        inserir esses poligonos em um mapa, mas para isso precisamos ter
        previamente o conjunto de <strong>coordenadas</strong> para delimitar a
        forma do poligono. Isso sugere que esse conjunto de dados deve está
        guardado em uma base de dados, e esses dados são consumidos a fim de que
        os poligonos sejam inseridos no mapa para visualização.
      </p>
      <p>
        Mas como conseguimos obter esses coordenadas para a formação do
        poligono? Para resolver esse problema, vamos aprender um pouco sobre
        oura ferramenta que é o <span>DrawingManager</span>.
      </p>
      <h2>DrawingManager</h2>
      <p>
        O <span>DrawingManager</span> se trata de um gerenciador de desenhos. Ou
        seja, é uma ferramenta que permite que o usuário "desenhe" diferentes
        figuras sobre o mapa. Mais especificamente polígonos, retângulos,
        polilinhas, círculos e marcadores.
      </p>
      <p>
        Usando essa ferramenta podemos desenhar nossos poligonos direto no mapa
        e posteriormente obter as coordenadas que formam o caminho do poligono
        criado. Uma vez que já temos as coordenadas que formam o poligono
        desejado, precisamos apenas criar e inserir ele em um mapa.
      </p>
      <p>
        Nesse tutorial vamos usar o Objeto <span>DrawingManager</span> para
        desenhar apenas <span>Polygons</span>, porém você pode consultar a
        documentação oficial para enteder como utilizar os demais recursos da
        ferramenta. Agora vamos a prática!
      </p>
      <p>
        <strong>Primeiro passo: </strong>nós vamos instanciar um novo Objeto
        DrawingManage e inserir ele em nosso mapa. Confira como fazer isso no
        trecho de código abaixo:
      </p>
      <aside className="image-cod two">
        <span className="btn-copy" onClick={() => copyCod("cod-content-two")}>
          <MdOutlineContentCopy />
        </span>
        <div id="cod-content-two">
          <div>
            <span className="kwd">const </span>
            <span>[myMap, setMyMap] = </span>
            <span>useState&#40;</span>
            <span className="kwd"></span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Mapa preexistente e já instanciado na DOM;
            </span>
          </div>
          <div>
            <span className="kwd">const </span>
            <span>[drawingManager, setDrawingManager] = </span>
            <span>useState&#40;</span>
            <span className="kwd"></span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// State que vai guardar o DrawingManager;
            </span>
          </div>
          <br />
          <div>
            <span className="kwd">function </span>
            <span> createDrawingManager&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Instancia um novo Objeto do tipo
              DrawingManager;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>drawingManager = </span>
            <span className="kwd">new </span>
            <span>google.maps.drawing.</span>
            <span className="typ">DrawingManager</span>
            <span>&#40;&#123;</span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;drawingMode:
              google.maps.drawing.OverlayType.
            </span>
            <span className="lit">POLYGON</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;// Define o DrawingManager inicialmente no modo de
              desenhar Polygons;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;drawingControl: </span>
            <span className="kwd">false</span>
            <span>,</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Desabilita a visualização da interface que permite o usuário
              selecionar a ferramenta de desenho;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&#125;&#41;;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;setDrawingManager</span>
            <span>&#40;</span>
            <span className="lit">drawingManager</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Armazenamos o DrawingManager, que acaba de
              ser criado, dentro do State;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;drawingManager</span>
            <span>.setMap&#40;</span>
            <span className="lit">myMap</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Inseri o
              DrawingManager dentro do mapa;
            </span>
          </div>
          <div>
            <span className="typ">&#125;</span>
          </div>
        </div>
      </aside>
      <p>
        Uma vez que o código acima for executado, a ferramenta{" "}
        <span>DrawingManage</span> já está inserida no mapa e o usuário já pode
        começar a desenhar o Poligono. Basta clicar em cada ponto que vai formar
        o poligono e você perceberá que uma linha irá ligar os pontos até que o
        poligono seja formado. Uma vez que o desenho estiver completo, isso nos
        leva para o próximo passo.
      </p>
      <p>
        <strong>Segundo passo: </strong>vamos adicionar um Listiner ao nosso{" "}
        <span>DrawingManage</span> que vai ouvir o evento{" "}
        <strong>"polygoncomplete"</strong>, que indica que um poligono acaba de
        ser criado. Com isso nós vamos conseguir manipular o{" "}
        <span>Polygon</span> que acaba de ser criado e obter as coordenadas que
        o formam. Confira o trecho de código a seguir:
      </p>
      <aside className="image-cod three">
        <span className="btn-copy" onClick={() => copyCod("cod-content-three")}>
          <MdOutlineContentCopy />
        </span>
        <div id="cod-content-three">
          <div>
            <span className="kwd">const </span>
            <span>[prevPolygon, setPrevPolygon] = </span>
            <span>useState&#40;</span>
            <span className="kwd"></span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// State que armazena o último poligono
              que foi desenhado;
            </span>
          </div>
          <div>
            <span className="kwd">const </span>
            <span>[coordinates, setCoordinates] = </span>
            <span>useState&#40;</span>
            <span className="kwd"></span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// State que guarda as coordenadas que
              formam o caminho do último poligono desenhado;
            </span>
          </div>
          <br />
          <div>
            <span className="kwd">function </span>
            <span> setListenerInDrawingManager&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;google.maps.event</span>
            <span>.addListener&#40;</span>
            <span className="kwd"> drawingManager </span>
            <span>, </span>
            <span className="str">"polygoncomplete" </span>
            <span>, </span>
            <span>&#40;</span>
            <span className="kwd">polygon</span>
            <span>: </span>
            <span className="lit">google.maps.Polygon</span>
            <span>&#41; =&gt; &#123;</span>
          </div>
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const
            </span>
            <span> coordinates: </span>
            <span className="lit">google.maps.LatLng</span>
            <span className="typ">[]</span>
            <span> = </span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;polygon.getPath&#40;&#41;.getArray&#40;&#41;.map&#40;
            </span>
            <span className="kwd"> coordinates </span>
            <span> =&gt; &#123;</span>
          </div>
          <div>
            <span className="typ">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return
            </span>
            <span className="kwd"> coordinates </span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;&#41;;
            </span>
          </div>
          <br />
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setPrevPolygon&#40;</span>
            <span className="kwd">polygon</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Guarda o poligono no
              state com do último poligono;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setCoordinates&#40;</span>
            <span className="kwd">coordinates</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Guarda as coordenadas no state de
              coordenadas;
            </span>
          </div>
          <br />
          <div>
            <span className="kwd">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;drawingManager
            </span>
            <span>.setMap&#40;</span>
            <span className="kwd">null</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Remove o DrawingManager do mapa, não
              permitindo a criação de novos desenhos;
            </span>
          </div>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&#125;&#41;;</span>
          </div>
          <div>
            <span className="typ">&#125;</span>
          </div>
        </div>
      </aside>
      <p>
        Após a execução do código acima sempre que o usuário finalizar o desenho
        de um poligono a função de <strong>callback</strong> será executada,
        armazenando o novo poligono e suas coordenadas em seus respectivos
        states e removendo o <span>DrawingManage</span> do mapa logo em seguida.
      </p>
      <p>
        É importante lembrar que essa função <strong>não excluiu</strong> o{" "}
        <span>DrawingManage</span>, ela apenas removeu a ferramenta do mapa para
        que o usuário não consiga desenhar novos poligonos. Isso nos leva a um
        último passo.
      </p>
      <p>
        <strong>Terceiro passo: </strong>vamos criar uma função que remove o
        ultimo poligono do mapa e na sequência vamos inseri novamente o{" "}
        <span>DrawingManage</span> para que o usuário possa criar um novo
        poligono. Observe o código a seguir:
      </p>
      <aside className="image-cod four">
        <span className="btn-copy" onClick={() => copyCod("cod-content-four")}>
          <MdOutlineContentCopy />
        </span>
        <div id="cod-content-four">
          <div>
            <span className="kwd">function </span>
            <span> removePrevPolygonAndReinsertDrawingManager&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;prevPolygon</span>
            <span>.setMap&#40;</span>
            <span className="kwd">null</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Remove o último poligono do mapa;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;drawingManager</span>
            <span>.setMap&#40;</span>
            <span className="kwd">myMap</span>
            <span>&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;// Inseri novamente o DrawingManager do mapa,
              permitindo a criação de novos desenhos;
            </span>
          </div>
          <br />
          <div>
            <span className="typ">&#125;</span>
          </div>
        </div>
      </aside>
      <p>
        Após executar esse último código, o nosso fluxo de construção de{" "}
        <span>Polygons</span> usando o <span>DrawingManage</span> está
        concluído. Perceba que em nosso estudo o algoritimo foi construído para
        a criação de um Poligono por vez, mas isso pode mudar conforme for a
        necessidade de cada empresa. Sendo assim, cada desenvolverdor poderá
        usar sua criatividade para utilizar as ferramentas disponiveis da forma
        mais eficiente possível para atender os requisitos de um projeto.
      </p>
      <p>
        Agora vamos visualizar o resultado do nosso algoritimo para construção
        de poligonos no mapa abaixo. Utilize os botões posicionados na parte
        inferior esquerda do mapa para inserir o <span>DrawingManage</span> e
        desenhe um poligono qualquer. Após criar um novo <span>Polygon</span>{" "}
        você pode removê lo clicando no botão com icone de pincel ou visualizar
        as coordenadas que o forma clicando no botão com o simbolo de Array.
      </p>
      <div className="render-myMap">
        <div className="content-map" id="render-myMap"></div>
        <Button
          style="btn-google-maps first"
          text=""
          handleClick={createDrawingManager}
        >
          <TbScribble />
        </Button>
        <Button
          style="btn-google-maps second"
          text=""
          handleClick={removePrevPolygonAndReinsertDrawingManager}
        >
          <GrClearOption />
        </Button>
        <Button
          style="btn-google-maps last"
          text=""
          handleClick={showArrayCoordinates}
        >
          <MdDataArray />
        </Button>
      </div>
      <p>
        Nesta seção criamos uma estrutura bem básica, dando os primeiros passos
        para a utilização do <span>DrawingManager</span>. No entanto existem
        outras formas de fazer uso dessas ferramentas em maiores escalas, com
        multiplos poligonos, cores diferentes para cada poligono, identificação
        com legenda para cada cor e etc.
      </p>
      {viewCoordinates && (
        <div className="window-message array">
          <div className="popup-confirm array">
            <h2>
              {coordinates.length > 0
                ? "Coordenadas do poligono criado"
                : "Desenhe um poligono e visualize as suas coordenadas"}
            </h2>
            <div id="content-array" className="content-array"></div>
            <Button
              style="button-primary"
              text="Fechar"
              handleClick={() => setViewCoordinates(!viewCoordinates)}
            />
          </div>
        </div>
      )}
      <a
        className="font-documentation"
        href="https://developers.google.com/maps/documentation/javascript/examples/polygon-simple"
        target="_blanck"
      >
        <span>Polygon</span>
        <RxGlobe />
      </a>
      <a
        className="font-documentation two"
        href="https://developers.google.com/maps/documentation/javascript/drawinglayer?hl=pt-br"
        target="_blanck"
      >
        <span>DrawingManager</span>
        <RxGlobe />
      </a>
    </section>
  );
};

export default Polygon;
