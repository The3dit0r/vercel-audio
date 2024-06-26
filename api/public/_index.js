function clip(a) {
  if (!a || !a.length) alert("nothing to save");
  else {
    try {
      navigator.clipboard.writeText(a);
      alert(`Saved to clipboard`);
    } catch (err) {
      try {
        const txte = document.createElement("span");
        txte.innerText = a;
        txte.select();

        document.execCommand("copy");
        txte.remove();
        alert(`Saved to clipboard`);
      } catch (err) {
        alert("Failed to copy");
      }
    }
  }
}

function copy(id) {
  try {
    const txte = document.getElementById(id);
    clip(txte.innerText);
  } catch (err) {
    console.error(err);
    alert("Failed to copy");
  }
}
