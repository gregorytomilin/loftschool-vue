import headline from "./headline";

export default {
  title: "headline",
  components: {headline}
}

export const defaultView = () => ({
  components: {headline},
  template: `
    <headline title="Панель администрирования">
      <h4>Какой-то контент</h4> 
    </headline>
  `
});
