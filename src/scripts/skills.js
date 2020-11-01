import Vue from "vue";

const skillsItem = {
  template: "#skills-item",
  props: ["skill"],
  methods: {
    drawSkillPercentages(){
      const circle = this.$refs["colored-circle"];
      const dashedArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const percent = (dashedArray / 100 ) * (100 - this.skill.percent);
      circle.style.strokeDashoffset = percent;
    }
  },
  mounted(){
    this.drawSkillPercentages()
  }
};

const skillsRow = {
  props: ['category'],
  template: "#skills-row",
  components: {
    skillsItem,
  }
};

new Vue({
  el: "#skills-component",
  components: {
    skillsRow
  },
  data(){
    return {
      skills: []
    }
  },
  created(){
    this.skills = require("../data/skills.json")
  },
  mounted(){
    
  },
  template: "#skills-list"
});