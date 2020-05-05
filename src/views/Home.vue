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
            <section class="section">
                <h2 class="beta">Time</h2>
                <questions :questions="dayQuestions"></questions>
            </section>
            <section class="section">
                <h2 class="beta">Emotions</h2>
                <questions :questions="emotions"></questions>
            </section>
            <section class="section">
                <h2 class="beta">Colours</h2>
                <questions :questions="colours"></questions>
            </section>
            <section class="section">
                <h2 class="beta">Nouns</h2>
                <questions :questions="nouns"></questions>
            </section>
        </div>
    </article>
</template>

<script>
import Questions from "@/components/Questions.vue";

import { format, add, sub } from "date-fns";

import numbers from "@/data/numbers.json";
import cases from "@/data/cases.json";
import verbs from "@/data/verbs.json";
import daysOfTheWeek from "@/data/days_of_the_week.json";
import emotions from "@/data/emotions.json";
import colours from "@/data/colours.json";
import nouns from "@/data/nouns.json";

export default {
    name: "Home",
    components: {
        Questions,
    },
    computed: {
        randomNumbers() {
            return this.newArray(numbers);
        },
        randomVerbs() {
            return this.newArray(verbs);
        },
        randomCases() {
            return this.newArray(cases);
        },
        dayQuestions() {
            return [
                {
                    english: "today",
                    greek: "σήμερα",
                },
                {
                    english: "tomorrow",
                    greek: "αύριο",
                },
                {
                    english: "yesterday",
                    greek: "εχθές",
                },
                {
                    english: "day after tomorrow",
                    greek: "μεθαύριο",
                },
                {
                    english: daysOfTheWeek[new Date().getDay() - 1].english,
                    greek: daysOfTheWeek[new Date().getDay() - 1].greek,
                },
            ];
        },
        emotions() {
            return this.newArray(emotions);
        },
        colours() {
            return this.newArray(colours);
        },
        nouns() {
            return this.newArray(nouns);
        },
    },
    methods: {
        newArray(array) {
            const arr =
                array.length > 5
                    ? new Array(5).fill()
                    : new Array(array.length).fill();

            return arr.map((n, i) => {
                const randomNumber = Math.round(
                    Math.random() * (array.length - 1)
                );
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

        @include mqMax(l-a) {
            .section {
                width: 100%;
            }
        }
    }
}
</style>