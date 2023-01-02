<template>
    <div class="card p-4 mb-5" 
         :class="`has-background-${bgColor}-dark`">

            <label class="label has-text-white"
                v-if="label"
            >{{ label }}
            </label>

            <div class="field"> 
            <div class="control">
            <textarea class="textarea" 
                      :placeholder="placeholder"
                      ref="textareaRef"
                      v-model="modelValue"
                      @input="$emit('update:modelValue', modelValue)">
            </textarea>
            </div>
            </div>

            <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons"></slot>
            </div>
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue';

const textareaRef = ref(null)

//props
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'Type something...'
    },
    label: {
        type: String
    }
})

//emits
const emit = defineEmits(['update:modelValue']) 
//  directly modifies the value coming from the parent component via v-model 
//  without having to emit an event through the child component to listen 
//  out the the event and then make a change

const focusTextarea = () => {
    textareaRef.value.focus()
}

//methods that we want to be accessible to the parent component
defineExpose({
    focusTextarea
})

</script>