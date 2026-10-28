from unittest import TestCase
from unittest.mock import patch

from app.core.config import settings


class ConfigTests(TestCase):
    @patch.object(settings, "debug", True)
    def test_debug_allows_local_frontend_origins(self):
        origins = settings.cors_origins

        self.assertIn("http://localhost:3000", origins)
        self.assertIn("http://127.0.0.1:3000", origins)

    @patch.object(settings, "debug", False)
    def test_production_does_not_allow_local_frontend_origins(self):
        origins = settings.cors_origins

        self.assertNotIn("http://localhost:3000", origins)
        self.assertNotIn("http://127.0.0.1:3000", origins)
