<template>
    <div class="questions__wrap">
        <div class="questions__inner">
            <ul class="questions">
                <li v-for="(question, n) in questions" :key="`${question.english}-${n}`">
                    <label class="questions__question">
                        <span class="questions__label">{{ question.english }}</span>
                        <div class="questions__input-wrap">
                            <input
                                type="text"
                                class="questions__input"
                                v-model="answers[n]"
                                :class="{ correct: answers[n] === question.greek }"
                            />
                        </div>
                        <button tabindex="-1" @click="stuck.push(n)" class="questions__stuck">Stuck</button>
                        <input
                            tabindex="-1"
                            v-if="stuck.includes(n)"
                            type="text"
                            class="questions__answer"
                            :value="question.greek"
                        />
                    </label>
                </li>
            </ul>
            <span v-if="showScore" class="questions__score">{{ score }} / {{questions.length}}</span>
        </div>
        <!-- <button class="questions__finished" @click="finished">Finished</button> -->
    </div>
</template>

<script>
export default {
    name: "Questions",
    props: {
        questions: {
            type: Array,
        },
    },
    data: () => ({
        answers: [],
        stuck: [],
        score: 0,
        showScore: false,
    }),
    mounted() {
        this.answers = this.questions.map(() => "");
    },
    methods: {
        finished() {
            this.score = this.questions.filter((question, n) => {
                return this.answers[n] === question.greek;
            }).length;

            this.stuck = this.questions.map((question, i) => {
                return question.greek === this.answers[i] ? -1 : i;
            });

            this.showScore = true;
        },
    },
};
</script>

<style lang="scss" scoped>
$module: "questions";

.#{$module} {
    margin-right: em(64);

    &__inner {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin-bottom: em(32);
    }

    &__question {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: em(12);
    }

    &__label {
        width: em(150);
        margin-right: em(16);
    }

    &__input {
        display: block;
        background-color: rgba(white, 0.1);
        outline: 0;
        border: 0;
        padding: em(10);
        color: $colorBody;

        &:focus {
            background-color: rgba(white, 0.2);
        }

        &.correct {
            background-color: rgba($colorPositive, 0.4);
        }
    }

    &__stuck {
        @extend %button;

        background-color: lighten($colorBackground, 10%);
        color: white;
        font-family: $ffHeadings;
        padding: em(5) em(15);
        align-self: stretch;
        margin-left: em(10);
        border-radius: em(4);

        &:hover {
            background-color: $colorHeadings;
            color: $colorBackground;
        }
    }

    &__answer {
        @extend .#{$module}__input;

        align-self: stretch;
        background-color: $colorHeadings !important;
        margin-left: em(10);
        color: $colorBackground;
        font-weight: 500;
        pointer-events: none;
    }

    &__finished {
        @extend %button-primary;
    }

    &__score {
        $fz: 256;
        font-size: em($fz);
        display: block;
        line-height: 1;
    }
}
</style>