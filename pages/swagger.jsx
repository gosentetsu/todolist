import { createSwaggerSpec } from "next-swagger-doc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const getStaticProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: "NextJS Swagger",
    version: "0.1.0",
  });
  return {
    props: {
      spec,
    },
  };
};
const ApiDoc = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export default ApiDoc;
