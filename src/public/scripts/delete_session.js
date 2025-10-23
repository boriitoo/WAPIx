function deleteSession(name) {
  if (confirm("Are you sure you want to delete this session ? ")) {
    fetch(`/api/sessions/${name}`, { method: "DELETE" })
      .then(() => window.location.reload())
      .catch((err) => alert("Error deleting session: " + err.message));
  }
}
