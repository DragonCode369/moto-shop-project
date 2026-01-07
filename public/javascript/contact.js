
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('form');
	if (!form) return;

	// Hide error message when user starts typing again (old JS)
	const elements = form.elements;
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
			el.oninput = function() {
				const msg = document.getElementById('form-message');
				if (msg && msg.parentNode) msg.parentNode.removeChild(msg);
			};
		}
	}

	form.onsubmit = function(e) {
		if (e && e.preventDefault) e.preventDefault();
		const data = {
			name: form.name.value,
			surname: form.surname.value,
			email: form.email.value,
			textbox: form.textbox.value
		};
		axios.post(form.action, data)
			.then(function(response) {
				// Manual implementation of closest ancestor finder (old JS)
				function findClosestAncestor(element, selector) {
					while (element) {
						if (element.matches && element.matches(selector)) {
							return element;
						}
						element = element.parentNode;
					}
					return null;
				}
				const contactFormDiv = findClosestAncestor(form, '.contact-form');
				if (contactFormDiv) {
					contactFormDiv.innerHTML = '<div class="success-message" style="text-align:center; font-size:1.2em; color:green; padding:2em 0;">' + (response.data.message || 'Poruka uspešno poslata!') + '</div>';
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
				let errorMsg = 'Došlo je do greške. Pokušajte ponovo.';
				if (error.response && error.response.data && error.response.data.message) {
					errorMsg = error.response.data.message;
				}
				msg.textContent = errorMsg;
				msg.style.color = 'red';
			});
	};
});

