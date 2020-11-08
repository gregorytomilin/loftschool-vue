import avatar from "./avatar.vue";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "avatar",
  components: { avatar },
  decorators: [withKnobs]
};

export const defaultView = () => ({
  components: { avatar },
  props: {
    size: {
      default: text("size", "3.1")
    }
  },
  template: `
    <avatar :size="size" src="https://img0.liveinternet.ru/images/attach/d/1/134/563/134563190_animalsorangutan_3152795k.jpg" />
  `,
});

defaultView.story = {
  name: "Стандартный вид"
}
