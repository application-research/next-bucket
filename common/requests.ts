export async function onGenerateToken(state, setState) {
  const response = await fetch("/api/token/generate");
  const json = await response.json();

  return setState({ ...state, token: json.token, loading: false });
}

export async function onCreateBucket(state, setState) {
  const prompt = window.prompt("What do you want to name your bucket?");
  if (!prompt) {
    return;
  }

  const response = await fetch("/api/buckets/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bucketName: prompt, key: state.key }),
  });

  return await onListBuckets(state, setState);
}

export async function onGetFilecoinAddresses(state, setState) {
  const response = await fetch("/api/filecoin/get-address", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: state.key }),
  });

  const json = await response.json();
  if (json.error) {
    alert(json.error);
    return { error: json.error };
  }

  return json;
}

export async function onListBuckets(state, setState) {
  const response = await fetch("/api/buckets/list", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: state.key }),
  });

  const json = await response.json();
  if (json.error) {
    alert(json.error);
    return { error: json.error };
  }

  return setState({ ...state, buckets: json.buckets, loading: false });
}

export async function onDeleteBucket(state, setState, options) {
  const confirm = window.confirm(
    "Are you sure you want to delete this bucket? This action is irreversible"
  );
  if (!confirm) {
    return;
  }

  const response = await fetch("/api/buckets/delete", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucketName: options.bucketName,
      bucketKey: options.bucketKey,
      key: state.key,
    }),
  });

  const json = await response.json();
  if (json.error) {
    alert(json.error);
    return { error: json.error };
  }

  return await onListBuckets(state, setState);
}

// NOTE(jim)
// Might not be able to handle large file uploads because the data transfer
// endpoint is on the same web server.
export async function onAddFile(state, setState, data) {
  const b = state.buckets.find((e) => e.key === state.selectedBucketKey);

  console.log(b);
  console.log(state);

  const response = await fetch("/api/buckets/add-file", {
    method: "POST",
    headers: {
      Authorization: `next-daemon-bucket ${b.name}|${b.key}|${state.key}`,
    },
    body: data,
  });

  const json = await response.json();
  if (json.error) {
    alert(json.error);
    setState({ ...state, loading: false });
    return { error: json.error };
  }

  return await onListBuckets(state, setState);
}

export async function onGetArchivesForBucket(state, setState, options) {
  const response = await fetch("/api/filecoin/get-archive-history", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucketName: options.bucketName,
      bucketKey: options.bucketKey,
      key: state.key,
    }),
  });

  const json = await response.json();

  setState({
    ...state,
    selectedArchives: {
      ...json.archives,
      bucketName: options.bucketName,
      bucketKey: options.bucketKey,
    },
  });

  console.log(json);
}

export async function onMakeStorageDeal(state, setState, options) {
  const response = await fetch("/api/filecoin/archive", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bucketName: options.bucketName,
      bucketKey: options.bucketKey,
      settings: options.settings,
      key: state.key,
    }),
  });

  const json = await response.json();

  setState({ ...state, selectedArchives: null });
  return json;
}

export async function onDeleteFile(state, setState) {
  alert("coming soon");
}
