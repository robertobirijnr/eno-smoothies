<template>
  <div class="addSmoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <p class="pink-text">
      <i>nb: use the tab key to add more ingredients to your smoothie</i>
    </p>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIn"
          v-model="anotherIng"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  data() {
    return {
      title: null,
      anotherIng: null,
      ingredients: [],
      feedback: null,
      slug: null,
    };
  },

  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },
    addIn() {
      if (this.anotherIng) {
        this.ingredients.push(this.anotherIng);
        this.anotherIng = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add your ingredient";
      }
    },
  },
};
</script>

<style scoped>
.addSmoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
h2 {
  font-size: 2em;
  margin: 20px auto;
}

.field {
  margin: 20px auto;
}
</style>
