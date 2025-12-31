import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppointments } from '@/features/appointments/hooks/useAppointments';

const AppointmentsManagement = () => {
  const { settings, updateSettings } = useAppointments();
  const [calendlyUrl, setCalendlyUrl] = useState(settings.calendlyUrl);
  const [urgencyMode, setUrgencyMode] = useState(settings.urgencyMode);
  const [urgencyMessage, setUrgencyMessage] = useState(settings.urgencyMessage);

  useEffect(() => {
    setCalendlyUrl(settings.calendlyUrl);
    setUrgencyMode(settings.urgencyMode);
    setUrgencyMessage(settings.urgencyMessage);
  }, [settings]);

  const handleSave = () => {
    updateSettings({
      calendlyUrl,
      urgencyMode,
      urgencyMessage,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des rendez-vous</h1>
        <p className="text-muted-foreground">
          Configurez les paramètres de prise de rendez-vous.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Calendly</CardTitle>
          <CardDescription>
            URL de l'événement Calendly pour la prise de rendez-vous.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calendly-url">URL Calendly</Label>
            <Input
              id="calendly-url"
              value={calendlyUrl}
              onChange={(e) => setCalendlyUrl(e.target.value)}
              placeholder="https://calendly.com/username/event"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mode Urgence</CardTitle>
          <CardDescription>
            Activez ce mode pour afficher un message temporaire au lieu du bouton de rendez-vous.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="urgency-mode"
              checked={urgencyMode}
              onCheckedChange={setUrgencyMode}
            />
            <Label htmlFor="urgency-mode">Activer le mode urgence</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgency-message">Message d'urgence</Label>
            <Textarea
              id="urgency-message"
              value={urgencyMessage}
              onChange={(e) => setUrgencyMessage(e.target.value)}
              placeholder="Le salon est actuellement complet..."
              disabled={!urgencyMode}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Enregistrer</Button>
      </div>
    </div>
  );
};

export default AppointmentsManagement;
