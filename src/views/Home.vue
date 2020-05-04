<template>
    <article class="home">
        <div class="home__questions">
            <section class="section" id="numbers">
                <h2 class="beta">Numbers</h2>
                <questions :questions="randomNumbers"></questions>
            </section>
            <section class="section">
                <h2 class="beta">Verbs</h2>
                <questions :questions="randomVerbs"></questions>
            </section>
            <section class="section">
                <h2 class="beta">Cases</h2>
                <questions :questions="randomCases"></questions>
            </section>
        </div>
    </article>
</template>

<script>
import Questions from "@/components/Questions.vue";

import numbers from "@/data/numbers.json";
import cases from "@/data/cases.json";
import verbs from "@/data/verbs.json";

const numbersArray = [...numbers];
const verbsArray = [...verbs];
const casesArray = [...cases];

export default {
    name: "Home",
    components: {
        Questions,
    },
    computed: {
        randomNumbers() {
            return this.newArray(numbersArray);
        },
        randomVerbs() {
            return this.newArray(verbsArray);
        },
        randomCases() {
            return this.newArray(casesArray);
        },
    },
    methods: {
        newArray(array) {
            const arr =
                array.length > 5
                    ? new Array(5).fill()
                    : new Array(array.length).fill();

            return arr.map((n, i) => {
                const randomNumber = Math.round(Math.random() * array.length);
                const returnValue = array[randomNumber];

                array.splice(randomNumber, 1);

                return returnValue;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
$module: "home";

.#{$module} {
    padding: em(32);

    &__questions {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        .section {
            width: calc(50% - #{em(32)});
        }
    }
}
</style>