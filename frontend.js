document.getElementById('generateEmail').addEventListener('click', async () => {
  const loading = document.getElementById('loading');
  const emailContainer = document.getElementById('emailContainer');
  const generatedEmail = document.getElementById('generatedEmail');

  loading.classList.remove('hidden');
  emailContainer.classList.add('hidden');

  try {
    const response = await fetch('/generate-email');
    const data = await response.json();

    if (data.success) {
      generatedEmail.textContent = data.email;
      emailContainer.classList.remove('hidden');
    } else {
      alert('Failed to generate email.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while generating email.');
  } finally {
    loading.classList.add('hidden');
  }
});

document.getElementById('copyButton').addEventListener('click', () => {
  const email = document.getElementById('generatedEmail').textContent;
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied to clipboard!');
  });
});
