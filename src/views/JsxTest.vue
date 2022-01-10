<script lang="jsx">
import { ref } from 'vue'
export default {
  setup() {
    let counter = ref(10)
    const onclick = () => {
      counter.value++
    }

    return () => (
      <>
        <p>jsx组件{counter.value}</p>
        <p onclick={onclick}>点击 +1 </p>
      </>
    )
  }
}
</script>
