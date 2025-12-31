import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import AdminLayout from "@/layout/AdminLayout";
import ImageUpload from "@/components/ui/image-upload";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { useAppointments } from "@/features/appointments/hooks/useAppointments";

const Settings = () => {
  const { settings, updateOpeningHours, updateContactInfo, updateAdminCredentials, updateHeroSettings, updateSocialLinks } = useAdminSettings();
  const { settings: appointmentSettings, updateSettings: updateAppointmentSettings } = useAppointments();

  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [contactInfo, setContactInfo] = useState(settings.contactInfo);
  const [adminCredentials, setAdminCredentials] = useState(settings.adminCredentials);
  const [heroSettings, setHeroSettings] = useState(settings.heroSettings);
  const [appointmentSettingsState, setAppointmentSettingsState] = useState(appointmentSettings);
  const [socialLinks, setSocialLinks] = useState(settings.socialLinks);

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>(settings.heroSettings?.image || '');

  const handleSaveOpeningHours = () => {
    updateOpeningHours(openingHours);
    toast.success("Horaires d'ouverture mis à jour !");
  };

  const handleSaveContactInfo = () => {
    updateContactInfo(contactInfo);
    toast.success("Coordonnées mises à jour !");
  };

  const handleSaveAdminCredentials = () => {
    updateAdminCredentials(adminCredentials);
    toast.success("Identifiants admin mis à jour !");
  };

  const handleSaveAppointmentSettings = () => {
    updateAppointmentSettings(appointmentSettingsState);
    toast.success("Paramètres de rendez-vous mis à jour !");
  };

  const handleSaveHeroSettings = () => {
    const imageToSave = heroImagePreview || heroSettings.image || '';
    updateHeroSettings({ ...heroSettings, image: imageToSave });
    toast.success("Paramètres de la section hero mis à jour !");
  };

  const handleSaveSocialLinks = () => {
    updateSocialLinks(socialLinks);
    toast.success("Liens des réseaux sociaux mis à jour !");
  };

  const handleHeroImageChange = (url: string | null, preview: string) => {
    setHeroImageFile(null); // Reset file since we have URL now
    setHeroImagePreview(url || '');
  };


  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col gap-6 p-6 overflow-x-hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre salon de coiffure
          </p>
        </div>

        <Tabs defaultValue="opening-hours" className="space-y-6">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide">
            <TabsTrigger value="opening-hours">Horaires d'ouverture</TabsTrigger>
            <TabsTrigger value="contact">Coordonnées</TabsTrigger>
            <TabsTrigger value="hero">Section Hero</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="opening-hours" className="space-y-6">
             <Card className="w-full max-w-full">
              <CardHeader>
                <CardTitle>Horaires d'ouverture</CardTitle>
                <CardDescription>
                  Modifiez les horaires selon les saisons ou les congés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {openingHours.map((hour, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 border rounded-lg">
                    <div className="w-full sm:w-32 flex-shrink-0">
                      <Label className="text-sm font-medium">{hour.day}</Label>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`closed-${index}`}
                          checked={hour.isClosed}
                          onCheckedChange={(checked) => {
                            const updated = [...openingHours];
                            updated[index] = { ...updated[index], isClosed: checked as boolean };
                            setOpeningHours(updated);
                          }}
                        />
                        <Label htmlFor={`closed-${index}`} className="text-sm">Fermé</Label>
                      </div>
                      {!hour.isClosed && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm flex-shrink-0">Ouverture:</Label>
                            <Input
                              type="time"
                              value={hour.openingTime}
                              onChange={(e) => {
                                const updated = [...openingHours];
                                updated[index] = { ...updated[index], openingTime: e.target.value };
                                setOpeningHours(updated);
                              }}
                              className="w-full sm:w-32"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm flex-shrink-0">Fermeture:</Label>
                            <Input
                              type="time"
                              value={hour.closingTime}
                              onChange={(e) => {
                                const updated = [...openingHours];
                                updated[index] = { ...updated[index], closingTime: e.target.value };
                                setOpeningHours(updated);
                              }}
                              className="w-full sm:w-32"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Separator />
                <Button onClick={handleSaveOpeningHours}>
                  Sauvegarder les horaires
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
             <Card className="w-full max-w-full">
              <CardHeader>
                <CardTitle>Coordonnées</CardTitle>
                <CardDescription>
                  Mettez à jour les informations de contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    placeholder="Adresse complète"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+32 XXX XX XX XX"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="contact@exemple.com"
                  />
                </div>
                <Separator />
                <Button onClick={handleSaveContactInfo}>
                  Sauvegarder les coordonnées
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero" className="space-y-6">
             <Card className="w-full max-w-full">
              <CardHeader>
                <CardTitle>Section Hero</CardTitle>
                <CardDescription>
                  Personnalisez le contenu de la section d'accueil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-badge">Badge</Label>
                  <Input
                    id="hero-badge"
                    value={heroSettings.badge}
                    onChange={(e) => setHeroSettings({ ...heroSettings, badge: e.target.value })}
                    placeholder="Texte du badge"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-title">Titre principal</Label>
                  <Input
                    id="hero-title"
                    value={heroSettings.title}
                    onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                    placeholder="Titre de la section hero"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Sous-titre</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={heroSettings.subtitle}
                    onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })}
                    placeholder="Description sous le titre"
                    rows={3}
                  />
                </div>
                <ImageUpload
                  id="hero-image"
                  label="Image de la section hero"
                  value={heroImagePreview}
                  onChange={handleHeroImageChange}
                  maxSize={5}
                  placeholder="Télécharger une image ou glisser-déposer"
                />
                <Separator />
                <Button onClick={handleSaveHeroSettings}>
                  Sauvegarder la section hero
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
             <Card className="w-full max-w-full">
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
                <CardDescription>
                  Gérez les liens vers vos profils sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    placeholder="https://www.instagram.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                    placeholder="https://www.facebook.com/username"
                  />
                </div>
                <Separator />
                <Button onClick={handleSaveSocialLinks}>
                  Sauvegarder les liens sociaux
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
             <Card className="w-full max-w-full">
              <CardHeader>
                <CardTitle>Paramètres de rendez-vous</CardTitle>
                <CardDescription>
                  Configurez l'intégration Calendly et le mode urgence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="calendly-url">URL Calendly</Label>
                  <Input
                    id="calendly-url"
                    value={appointmentSettingsState.calendlyUrl}
                    onChange={(e) => setAppointmentSettingsState({ ...appointmentSettingsState, calendlyUrl: e.target.value })}
                    placeholder="https://calendly.com/username"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="urgency-mode"
                    checked={appointmentSettingsState.urgencyMode}
                    onCheckedChange={(checked) => setAppointmentSettingsState({ ...appointmentSettingsState, urgencyMode: checked as boolean })}
                  />
                  <Label htmlFor="urgency-mode">Mode urgence</Label>
                </div>
                <div>
                  <Label htmlFor="urgency-message">Message d'urgence</Label>
                  <Input
                    id="urgency-message"
                    value={appointmentSettingsState.urgencyMessage}
                    onChange={(e) => setAppointmentSettingsState({ ...appointmentSettingsState, urgencyMessage: e.target.value })}
                    placeholder="Message affiché en mode urgence"
                  />
                </div>
                <Separator />
                <Button onClick={handleSaveAppointmentSettings}>
                  Sauvegarder les paramètres de rendez-vous
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
             <Card className="w-full max-w-full">
              <CardHeader>
                <CardTitle>Identifiant Admin</CardTitle>
                <CardDescription>
                  Modifiez les identifiants de connexion admin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="admin-email">Email admin</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={adminCredentials.email}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                    placeholder="admin@exemple.com"
                  />
                </div>
                <div>
                  <Label htmlFor="admin-password">Mot de passe</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                <Separator />
                <Button onClick={handleSaveAdminCredentials}>
                  Sauvegarder les identifiants
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
