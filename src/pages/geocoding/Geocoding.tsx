import { useState } from "react";
import "./Geocoding.css";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

import { CiSearch } from "react-icons/ci";
import { RxGlobe } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";

import {
  createInteractiveView,
  removeAllChildren,
} from "../../utils/createConteinerObjectFormat";
import { copyContentConteiner } from "../../utils/copyContentConteiner";

const Geocoding = () => {
  const [address, setAddress] = useState<string>("");
  const [displayingSearchData, setDisplayingSearchData] =
    useState<boolean>(false);

  const fetchAddress = () => {
    if (!address) return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results) {
        const resultContentConteinerHtml: HTMLDivElement =
          document.getElementById("content-result-search") as HTMLDivElement;

        createInteractiveView(
          JSON.parse(JSON.stringify(results[0])),
          resultContentConteinerHtml
        );
      } else {
        alert(
          "Geocoder was not successfull for the followwing reason: " + status
        );
      }
    });

    setDisplayingSearchData(true);
  };

  const removePreviousFetch = () => {
    const resultContentConteinerHtml: HTMLDivElement = document.getElementById(
      "content-result-search"
    ) as HTMLDivElement;

    removeAllChildren(resultContentConteinerHtml);
    setDisplayingSearchData(false);
  };

  const copyCod = () => {
    const conteinerWithCodContent: HTMLDivElement = document.getElementById(
      "cod-content"
    ) as HTMLDivElement;

    copyContentConteiner(conteinerWithCodContent);
  };

  return (
    <section className="geocoding">
      <h2>Geocoding</h2>
      <p>
        O <span>Geocoding</span> é uma ferramenta que nos permite realizar
        buscas avançadas por endereços e obter informações detalhadas sobre o
        endereço objeto de busca.
      </p>
      <p>
        Utilizar essa ferramenta é algo simples e de rápida implementação no seu
        código. Observe o exemplo a seguir:
      </p>
      <aside className="image-cod">
        <span className="btn-copy" onClick={copyCod}>
          <MdOutlineContentCopy />
        </span>
        <div id="cod-content">
          <div>
            <span className="kwd"> function </span>
            <span> fetchAddress&#40;&#41; </span>
            <span className="typ">&#123;</span>
          </div>
          <br />
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>geocoder = </span>
            <span className="kwd">new </span>
            <span>google.maps.Geocoder&#40;&#41;;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//
              Instancia um novo Objeto Geocoding;
            </span>
          </div>
          <div>
            <span className="kwd">&nbsp;&nbsp;&nbsp;const </span>
            <span>address = </span>
            <span>document.getElementById&#40;</span>
            <span className="str">"address"</span>
            <span>&#41;.value;</span>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;// Obtem o endereço digitado pelo usuário
              em um Input na DOM;
            </span>
          </div>
          <br />
          <div>
            <span className="str">&nbsp;&nbsp;&nbsp;\*</span>
          </div>
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Função que inicia a busca, recebendo
              os seguintes parâmetros:
            </span>
          </div>
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1° Objeto contendo o endereço a ser
              pesquisado;
            </span>
          </div>
          <div>
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2° callback que lida com o retorno
              da resposta da busca realizada;
            </span>
          </div>
          <div>
            <span className="str">&nbsp;&nbsp;&nbsp;\*</span>
          </div>
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
            <span className="str">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// se o resultado da busca for "OK",
              ultilizamos o resultado de busca retornados pela GeocoderAPI
            </span>
          </div>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log&#40;
            </span>
            <span className="str">results</span>
            <span>&#41;</span>
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
      <div className="input-fetch-address">
        <Input
          type="text"
          placeholder="Buscar endereço"
          handleOnChange={(value) => setAddress(value)}
        />
        <Button text="Buscar" style="button-primary" handleClick={fetchAddress}>
          <CiSearch />
        </Button>
      </div>
      <div className="result-search">
        <p>
          Resultado da busca:
          {displayingSearchData && <BsTrash3 onClick={removePreviousFetch} />}
        </p>
        <div id="content-result-search" className="content-result-search"></div>
      </div>
      <p>
        Observando o Objeto retornado pela busca, percebemos a presença de
        informações importantes como rua, códico postal, bairro, cidade, estado,
        país, coordenadas de geolocalização e etc.
      </p>
      <p>
        Essas informações podem ser muito úteis em mecânismos de
        autopreenchimento em cadastros diversos. Neste tutorial nós vamos
        aprender a usar esses dados para interagir com mapas, direcionando-o
        para o local desejado e até inserindo&nbsp;
        <strong>Marcadores</strong> personalizados.
      </p>
      <p>Confira os próximos passos que serão abordados nas próximas seções!</p>
      <a
        className="font-documentation"
        href="https://developers.google.com/maps/documentation/javascript/geocoding?hl=pt-br"
        target="_blanck"
      >
        <span>Fonte</span>
        <RxGlobe />
      </a>
    </section>
  );
};

export default Geocoding;
