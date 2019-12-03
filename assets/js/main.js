/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

		//Menu

		var sidebarHTML = `
		<div class="inner">

			<!-- Menu -->
				<nav id="menu">
				<header class="major">
					<h2>Menu</h2>
				</header>
				<ul>
					<li><a href="index.html">Accueil</a></li>
					<li><a href="intro.html">Introduction</a></li>
					<li>
						<span class="opener" href='variables.html'>Variables</span>
						<ul>
							<li><a href="variables.html">Déclaration</a></li>
							<li><a href="types.html">Types</a></li>
							<li><a href="scope.html">Portée</a></li>
						</ul>
					</li>
					<li><a href="operations.html">Opérations</a></li>
					<li><a href="comparison.html">Comparaisons</a></li>
					<li>
						<span class="opener">Contrôle du flux</span>
						<ul>
							<li><a href="if.html">Si/sinon</a></li>
							<li><a href="loop.html">Boucles</a></li>
						</ul>
					</li>
					<li>
						<span class="opener">Projets</span>
						<ul>
							<li><a href="guess.html">Deviner le nombre</a></li>
							<li><a href="clicker.html">Création d'un clone de <i><b>Cookie Clicker</b></i></a></li>
						</ul>
					</li>
					<li><a href="bibliographie.html">Bibliographie</a></li>
				</ul>
				</nav>

			<!-- Section -->
				<section>
					<header class="major">
						<h2>Autres ressources</h2>
					</header>
					<div class="mini-posts">
						<article>
							<a href="https://developer.mozilla.org/fr/" class="image"><img src="images/mdn.svg" alt="" /></a>
							<p>MDN est un site web géré par Mozilla, qui édite le navigateur web <i>Firefox</i>. Ce site web est une référence complète pour JavaScript. L'information y est de très bonne qualité.</p>
						</article>
						<article>
							<a href="https://stackoverflow.com/" class="image"><img src="images/stackoverflow.png" alt="" /></a>
							<p>StackOverflow est un site web (en anglais), qui permet aux développeurs (de tous les niveaux), de poser des questions à d'autres développeurs. Ce forum peut se montrer très utile lorsque tu bloques sur un problème.</p>
						</article>
						<article>
							<a href="https://stackoverflow.com/"><b>Javascript.info</b></a><br><br>
							<p>Javascript.info est un tutoriel JavaScript très complet. Il est légèrement plus difficile, mais il complémente très bien ce tutoriel.</p>
						</article>
					</div>
				</section>

			<!-- Footer -->
				<footer id="footer">
					<p class="copyright"> Contenu: Louis-Félix Berthiaume. Design: <a href="https://html5up.net">HTML5 UP</a>.

						Icônes par <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>, <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> et <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> de <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a>
					</p>
				</footer>

		</div>
		`;

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				document.getElementById('sidebar').innerHTML = sidebarHTML;
				document.getElementsByTagName('head')[0].innerHTML += '<link rel="shortcut icon" type="image/png" href="images/favicon.png"/>';
				window.setTimeout(function() {
					$body.removeClass('is-preload');

					// Menu.
						var $menu = $('#menu'),
							$menu_openers = $menu.children('ul').find('.opener');

						// Openers.
							$menu_openers.each(function() {

								var $this = $(this);

								$this.on('click', function(event) {

									// Prevent default.
										event.preventDefault();

									// Toggle.
										$menu_openers.not($this).removeClass('active');
										$this.toggleClass('active');

									// Trigger resize (sidebar lock).
										$window.triggerHandler('resize.sidebar-lock');

								});

							});

							// Toggle.
								$('<a href="#sidebar" class="toggle"></a>')
									.appendTo($sidebar)
									.on('click', function(event) {

										// Prevent default.
											event.preventDefault();
											event.stopPropagation();

										// Toggle.
											$sidebar.toggleClass('inactive');

									});


				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});



})(jQuery);

function handleSuccess(linkNext=true) {
	let alertFooter = 'Passe au prochain exercice!';
	if(linkNext)
		alertFooter = "<a id='nextButton'>Aller vers la suite</a>"
	Swal.fire({
	  icon: 'success',
	  title: 'Bravo!',
	  text: "Tu as réussi l'exercice",
	  footer: alertFooter,
	  showConfirmButton: false
	});
	if(linkNext) {
		document.getElementById('nextButton').addEventListener('click', () => {
			const getChapter = (url) => {
				url = url.split('/');
				return url[url.length - 1]
			}
			let currentChapter = getChapter(location.pathname);
			let nextChapter;
			let chapters = Array.from(document.getElementById('menu').getElementsByTagName('a'));
			chapters.forEach((ch, i) => {
				if(getChapter(ch.href) === currentChapter)
					nextChapter = chapters[i + 1].href;
			});
			location.href = nextChapter;
		});
	}
}

function handleFail() {
	Swal.fire({
	  icon: 'error',
	  title: 'Hummmm...',
	  text: "Une erreur a été détectée, essaye encore",
	  footer: "<a href='https://developer.mozilla.org/en-US/docs/Mozilla/Debugging/Debugging_JavaScript'>Tu peux consulter la console pour t'aider</a>",
	  showConfirmButton: false
	});
}

function nextPage() {
	const getChapter = (url) => {
		url = url.split('/');
		return url[url.length - 1]
	}
	let currentChapter = getChapter(location.pathname);
	let nextChapter;
	let chapters = Array.from(document.getElementById('menu').getElementsByTagName('a'));
	chapters.forEach((ch, i) => {
		if(getChapter(ch.href) === currentChapter)
			nextChapter = chapters[i + 1].href;
	});
	location.href = nextChapter;
}
