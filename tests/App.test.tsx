import * as React from "react";
import renderer from "react-test-renderer";
import App from "../src/components/App";

it("App is rendered", () => {
  // Render App in the document
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
