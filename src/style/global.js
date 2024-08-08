import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }
body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  justify-content: center;
  display: flex;
  width: 100vw;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #333;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}
`;
export default Global