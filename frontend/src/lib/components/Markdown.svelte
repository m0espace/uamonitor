<script lang="ts">
  import DOMPurify from 'dompurify';
  import { marked } from 'marked';

  export let md: string;

  const result = DOMPurify.sanitize(marked(md));
</script>

<div class="prose dark:prose-invert">{@html result}</div>
