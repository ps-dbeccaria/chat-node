<template>
  <div class="fieldset-container">
    <fieldset :style="{ height: fieldsetHeight }">
      <textarea :value="value" @input="onInputValue" ref="textarea"></textarea>
      <button class="cta" @click="$emit('stream')">
        <img :src="icon" alt="">
      </button>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import sendIcon from '../../assets/icon-send.svg';

export default defineComponent({
  name: 'GrowingFieldset',
  data () {
    return {
      icon: sendIcon
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
  },
  emits: ['update:value', 'stream'],
  setup(props, { emit }) {
    const text = ref(props.value || '');
    const fieldsetHeight = ref('auto');

    // const updateFieldsetHeight = () => {
    //   fieldsetHeight.value = `${textareaRef?.value?.scrollHeight ?? 50}px`;
    // }

    const textareaRef = ref<any>(null);
    const onInputValue = (event: any): void => {
      const target = event.target as HTMLTextAreaElement;
      text.value = target.value;

      emit('update:value', text.value);
    }

    watch(() => props.value, (newValue) => {
      if (newValue !== text.value) {
        text.value = newValue || '';
        // updateFieldsetHeight();
      }
    });

    return { text, fieldsetHeight, onInputValue, textareaRef };
  }
});
</script>

<style scoped>
.fieldset-container {
  width: 50%;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 25%;
}

fieldset {
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  resize: none;
  margin: 0 auto;
  width: 100%;
}

textarea {
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
  line-height: 1.4;
  font-family: inherit;
  border-radius: 16px 0 0 16px;
  resize: none;
  height: 75px;
}

button.cta {
  background-color: var(--main-color-darkgreen);
  border-radius: 0px 16px 16px 0;
  height: 7.75vh;
}

@media screen and (max-width: 1600px) {
  fieldset {
    margin: auto;
  }
}
</style>