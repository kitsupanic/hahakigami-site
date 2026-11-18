<script lang="ts">
  import { page } from '$app/state';
  import NotFound from '#lib/NotFound.svelte';
</script>

<NotFound status={page.status} />
