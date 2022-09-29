import { PIZZA_NAMES } from "@/common/constants/";
import { getSlots, getAttrs } from "@/util/helpers";
import useSearchResult from "@/use/useSearchResult";
import inputProps from "@/common/components/AppInput/AppInputProps";
import AppInput from "@/common/components/AppInput/AppInput";
import AppIcon from "@/common/components/AppIcon/AppIcon";
import {
  defineComponent,
  ref,
  computed,
  reactive,
  onBeforeUnmount,
} from "@vue/composition-api";

export default defineComponent({
  name: "AppInputVoiceCntrl",
  inheritAttrs: false,
  props: {
    ...inputProps(),
    recognition: {
      type: Function,
      require: true,
    },
    lang: {
      type: String,
      default: "ru-RU",
    },
  },
  setup(props, context) {
    const { slots, emit } = context;
    const recognition = props.recognition;
    const speechRecognition = new recognition();
    const isStarted = ref(false);
    const isSpeacked = ref(false);
    const isReceived = ref(false);
    const error = ref("");
    const resultTranscription = ref("");
    const Error = reactive({
      EMPTY_REQUEST: "Вы ничего не сказали. Попробуйте еще раз",
      INVALID_REQUEST: "Пицца под таким названием не найдена.",
    });
    const Color = reactive({
      ACTIVE: "#41B619",
      DEFAULT: "#B3ABBC",
    });
    const checkTranscript = (text) => {
      return useSearchResult(text, PIZZA_NAMES);
    };
    const emitError = (errStr) => {
      error.value = errStr;
      emit("update:error", error.value);
    };
    const stopSpeeching = () => {
      speechRecognition.stop();
      isStarted.value = false;
    };
    const startSpeeching = () => {
      isStarted.value = true;
      emitError("");
    };
    const cntrlVoiceHandler = () => {
      speechRecognition.lang = props.lang;
      speechRecognition.start();
      startSpeeching();
    };
    const speechStartHandler = () => {
      isSpeacked.value = true;
    };
    const speechEndHandler = () => {
      isSpeacked.value = false;
    };
    const speechResultHandler = ({ results }) => {
      resultTranscription.value = results[0][0].transcript;
      isReceived.value = true;
    };
    const endHandler = () => {
      if (!isReceived.value) {
        emitError(Error.EMPTY_REQUEST);
        stopSpeeching();
        return false;
      }
      if (!checkTranscript(resultTranscription.value)) {
        emitError(Error.INVALID_REQUEST);
        emit("update:iValue", "");
        stopSpeeching();
        return false;
      }
      emit("update:iValue", checkTranscript(resultTranscription.value));
      resultTranscription.value = "";
      stopSpeeching();
    };
    speechRecognition.addEventListener("speechstart", speechStartHandler);
    speechRecognition.addEventListener("speechend", speechEndHandler);
    speechRecognition.addEventListener("result", speechResultHandler);
    speechRecognition.addEventListener("end", endHandler);
    onBeforeUnmount(() => {
      speechRecognition.removeEventListener("speechstart", speechStartHandler);
      speechRecognition.removeEventListener("speechend", speechEndHandler);
      speechRecognition.removeEventListener("result", speechResultHandler);
      speechRecognition.removeEventListener("end", endHandler);
    });
    const iconClasses = computed(() => ({
      "input__cntrl-voice": true,
      "input__cntrl-voice--speaked": isSpeacked.value,
      "input__cntrl-voice--started": isStarted.value,
    }));
    const iconColor = computed(() => {
      return isStarted.value ? Color.ACTIVE : Color.DEFAULT;
    });
    return () => {
      const iconVoiceCntrl = (
        <AppIcon
          class={iconClasses.value}
          size={22}
          ariaRole="button"
          alternateText="Нажми чтобы начать голосовой ввод"
          vOn:click={cntrlVoiceHandler}
        >
          <path
            fill={iconColor.value}
            d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </AppIcon>
      );
      const inputAttrs = {
        ...getAttrs(context),
        props,
      };
      return (
        <AppInput {...{ ...inputAttrs }}>
          {getSlots(slots)}
          {iconVoiceCntrl}
        </AppInput>
      );
    };
  },
});
