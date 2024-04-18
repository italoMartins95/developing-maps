import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css/bundle";
import "./Review.css";
import "swiper/css/navigation";

import ifood from "../../images/ifood.png";
import uber from "../../images/uber.png";
import airbnb from "../../images/airbnb.webp";
import starbucks from "../../images/starbucks.webp";
import niantic from "../../images/niantic.png";
import booking from "../../images/booking.png";

import { AiOutlineLink } from "react-icons/ai";
import { RxGlobe } from "react-icons/rx";

const Review = () => {
  const [images, setImages] = useState([
    ifood,
    uber,
    airbnb,
    starbucks,
    niantic,
    booking,
  ]);

  return (
    <section className="review">
      <h2>Conclusion</h2>
      <p>
        Neste tutorial aprendemos como utilizar algumas ferramentas de
        Geolocalização do GoogleMaps Platform para criar mapas interativos, com
        mecanismos de busca integrada, marcadores personalizados, demarcação de
        regiões e etc.
      </p>
      <p>
        Todo o conteúdo abordado nas seções anteriores são apenas uma degustação
        do verdadeiro <strong>poder</strong> dessas ferramentas incríveis. É
        possível criar controladores personalizados dentro dos Mapas, inserir
        popUp's com mensagens personalizadas, identificar melhores rotas para o
        deslocamento em qualquer cidade do mundo e não para por ai.
      </p>
      <p>
        As ferramentas de Geolocalização do Google fornecem dados precisos e com
        um elevado grau de personalização e podem ser utilizadas em muitas
        soluções tecnologicas. Não é atoa que grandes empresas utilizam esses
        serviços e provavelmente você conhece muitas delas. Algusn exemplos são:
      </p>
      <div className="caroussel">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={true}
          pagination={{
            clickable: true,
            enabled: true,
          }}
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="card">
                  <img src={image} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <p>
        Todas as ferramentas que foram abordadas aqui são 100% compativeis com
        JavaScript e TypeScript. E não podemos esquecer dos principais
        Frameworks e Bibliotecas de desenvolvimento Web e Mobile: React,
        ReactNative, Angular e Vue.
      </p>
      <p>
        Se você gostou e quer aprender mais, explore a documentação oficial
        do&nbsp;
        <span>
          <a target="_blank" href="https://developers.google.com/maps?hl=pt-br">
            GooleMaps Plataform
          </a>
          <AiOutlineLink />
        </span>{" "}
        e você vai conseguir aprender muito mais.
      </p>
      <p>Você também pode usar bibliotecas auxiliares como:</p>
      <ul>
        <li>
          <span>
            <a
              target="_blank"
              href="https://www.npmjs.com/package/@react-google-maps/api"
            >
              react-google-maps/api
            </a>
            <AiOutlineLink />:
          </span>{" "}
          biblioteca para React com TypeScript;
        </li>
        <li>
          <span>
            <a
              target="_blank"
              href="https://www.npmjs.com/package/@angular/google-maps"
            >
              angular/google-maps
            </a>
            <AiOutlineLink />:
          </span>{" "}
          uma biblioteca oficial do Google para integração do Google Maps com o
          Angular;
        </li>
        <li>
          <span>
            <a target="_blank" href="https://vue-map.netlify.app/">
              vue-google-maps
            </a>
            <AiOutlineLink />:
          </span>{" "}
          esta é outra biblioteca para integração do Google Maps com o Vue.js.;
        </li>
        <li>
          <span>
            <a
              target="_blank"
              href="https://www.npmjs.com/package/react-native-maps"
            >
              react-native-maps
            </a>
            <AiOutlineLink />:
          </span>{" "}
          esta é uma biblioteca para integração de mapas em aplicativos React
          Native, utilizando o Google Maps ou o Apple Maps, dependendo do
          dispositivo em que o aplicativo está sendo executado;
        </li>
      </ul>
      <p>
        Para que utilziar o GoogleMaps Plataform com qualquer uma das
        bibliotecas mencionadas acima, é necessário obter uma{" "}
        <span>API_KEY</span> do Google. Crie uma conta no{" "}
        <span>
          (
          <a target="_blank" href="https://developers.google.com/maps?hl=pt-br">
            GoogleMaps Plataform
          </a>
          <AiOutlineLink />)
        </span>{" "}
        e obtenha uma Chave gratuita para realizar testes durante seus estudos.
      </p>
      <p>
        <span>OBS. </span>a chave gratuita só ficará disponivél durante a
        validade informada no GoogleMaps Plataform após o cadastro. O Google não
        faz cobranças indevidas após a expiração do prazo de validade da sua
        conta de demonstração. Qualquer cobrança só será realizada mediante a
        ativação <span>MANUAL</span> de uma conta paga do Google Cloud.
      </p>
      <p>Obrigado por ter chegado até aqui. Bons estudos!</p>
      <a
        className="font-documentation"
        href="https://developers.google.com/maps?hl=pt-br"
        target="_blanck"
      >
        <span>Fonte</span>
        <RxGlobe />
      </a>
    </section>
  );
};

export default Review;
