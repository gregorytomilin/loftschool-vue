<template>
  <div class="skill-component" v-if="editmode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percent">{{skill.percent}}</div>
    <div class="buttons">
      <icon symbol="pencil" class="btn" @click="editmode = true" grayscale />
      <icon symbol="trash" class="btn" @click="$emit('remove', skill.id)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input noSidePaddings
      v-model="currentSkill.title"
      @input="checkForEmptyInputValue($event)"
      @keydown.native.enter="onApprove"


      ></app-input>

      <tooltip
              v-if="emptyInput.length > 0"
              :errorText="errorText"
              :text="emptyInput"
              slot="tooltip"
              v-model="emptyInput"
      ></tooltip>
    </div>
    <div class="percent">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="buttons">
      <icon symbol="tick" class="btn" @click="$emit('approve', currentSkill)" />
      <icon symbol="cross" class="btn" @click="editmode = false" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import icon from "../icon";



export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    },
    errorText: {
      type: String,
      default: "",
    },
    editModeByDefault: Boolean,
    blocked: Boolean,
  },
  data() {
    return {
      editmode: false,
      emptyInput: this.errorText,
      currentSkill: {
        id: 0,
        title: this.skill.title,
        percent: this.skill.percent
      }
    };
  },
  components: {
    icon,
    appInput: input,
    tooltip: () => import("components/tooltip"),
  },

   methods: {
      onApprove() {

        if (this.value === "") {
          this.emptyInput = 'Заполните поле';
        } else {
          this.emptyInput = '';
        }

        if (this.title.trim() === "") return false;

        if (this.title.trim() === this.value.trim()) {
          this.editmode = false;
        } else {
          this.$emit("approve", this.value);
        }
      },
      checkForEmptyInputValue (e) {
        console.log(e);
        if(e.length > 0) {
          this.emptyInput = ''
        } else {
          this.emptyInput = 'Заполните поле';
        }
      }
    },
};
</script>

<style lang="postcss" src="./skill.pcss" scoped></style>

