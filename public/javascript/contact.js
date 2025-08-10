
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('form');
	if (!form) return;
	// Hide error message when user starts typing again
	Array.from(form.elements).forEach(function(el) {
		if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
			el.addEventListener('input', function() {
				const msg = document.getElementById('form-message');
				if (msg) msg.remove();
			});
		}
	});

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const data = {
			name: form.name.value,
			surname: form.surname.value,
			email: form.email.value,
			textbox: form.textbox.value
		};
		axios.post(form.action, data)
			.then(function(response) {
				// Manual implementation of closest ancestor finder
				function findClosestAncestor(element, selector) {
					while (element) {
						if (element.matches(selector)) {
							return element;
						}
						element = element.parentElement;
					}
					return null;
				}
				const contactFormDiv = findClosestAncestor(form, '.contact-form');
				if (contactFormDiv) {
					contactFormDiv.innerHTML = `<div class="success-message" style="text-align:center; font-size:1.2em; color:green; padding:2em 0;">${response.data.message || "Poruka uspešno poslata!"}</div>`;
				}
			})
			.catch(function(error) {
				// Show specific error message above the form, keep the form visible
				let msg = document.getElementById('form-message');
				if (!msg) {
					msg = document.createElement('div');
					msg.id = 'form-message';
					msg.style.color = 'red';
					msg.style.textAlign = 'center';
					msg.style.marginBottom = '1em';
					form.parentNode.insertBefore(msg, form);
				}
				let errorMsg = "Došlo je do greške. Pokušajte ponovo.";
				if (error.response && error.response.data && error.response.data.message) {
					errorMsg = error.response.data.message;
				}
				msg.textContent = errorMsg;
				msg.style.color = 'red';
			});
	});
});

