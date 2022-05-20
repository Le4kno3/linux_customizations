package wappalyzer

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestCookiesDetect(t *testing.T) {
	wappalyzer, err := New()
	require.Nil(t, err, "could not create wappalyzer")

	matches := wappalyzer.Fingerprint(map[string][]string{
		"Set-Cookie": []string{"_uetsid=ABCDEF"},
	}, []byte(""))

	require.Contains(t, matches, "Microsoft Advertising", "Could not get correct match")

	t.Run("position", func(t *testing.T) {
		wappalyzerClient, _ := New()

		fingerprints := wappalyzerClient.Fingerprint(map[string][]string{
			"Set-Cookie": []string{"path=/; jsessionid=111; path=/, jsessionid=111;"},
		}, []byte(""))
		fingerprints1 := wappalyzerClient.Fingerprint(map[string][]string{
			"Set-Cookie": []string{"jsessionid=111; path=/, XSRF-TOKEN=; expires=test, path=/ laravel_session=eyJ*"},
		}, []byte(""))

		require.Equal(t, map[string]struct{}{"Java": {}}, fingerprints, "could not get correct fingerprints")
		require.Equal(t, map[string]struct{}{"Java": {}, "Laravel": {}, "PHP": struct{}{}}, fingerprints1, "could not get correct fingerprints")
	})
}

func TestHeadersDetect(t *testing.T) {
	wappalyzer, err := New()
	require.Nil(t, err, "could not create wappalyzer")

	matches := wappalyzer.Fingerprint(map[string][]string{
		"Server": []string{"now"},
	}, []byte(""))

	require.Contains(t, matches, "Vercel", "Could not get correct match")
}

func TestBodyDetect(t *testing.T) {
	wappalyzer, err := New()
	require.Nil(t, err, "could not create wappalyzer")

	t.Run("meta", func(t *testing.T) {
		matches := wappalyzer.Fingerprint(map[string][]string{}, []byte(`<html>
<head>
<meta name="generator" content="mura cms 1.2.0">
</head>
</html>`))
		require.Contains(t, matches, "Mura CMS", "Could not get correct match")
	})

	t.Run("html-implied", func(t *testing.T) {
		matches := wappalyzer.Fingerprint(map[string][]string{}, []byte(`<html data-ng-app="rbschangeapp">
<head>
</head>
<body>
</body>
</html>`))
		require.Contains(t, matches, "AngularJS", "Could not get correct implied match")
		require.Contains(t, matches, "PHP", "Could not get correct implied match")
		require.Contains(t, matches, "Proximis Unified Commerce", "Could not get correct match")
	})
}
