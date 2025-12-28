import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import { useAdminSettings } from "@/hooks/useAdminSettings";

const Settings = () => {
  const { settings, updateOpeningHours, updateContactInfo, updateAdminCredentials } = useAdminSettings();

  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [contactInfo, setContactInfo] = useState(settings.contactInfo);
  const [adminCredentials, setAdminCredentials] = useState(settings.adminCredentials);

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


  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre salon de coiffure
          </p>
        </div>

        <Tabs defaultValue="opening-hours" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="opening-hours">Horaires d'ouverture</TabsTrigger>
            <TabsTrigger value="contact">Coordonnées</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="opening-hours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Horaires d'ouverture</CardTitle>
                <CardDescription>
                  Modifiez les horaires selon les saisons ou les congés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {openingHours.map((hour, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-32">
                      <Label className="text-sm font-medium">{hour.day}</Label>
                    </div>
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
                      <>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Ouverture:</Label>
                          <Input
                            type="time"
                            value={hour.openingTime}
                            onChange={(e) => {
                              const updated = [...openingHours];
                              updated[index] = { ...updated[index], openingTime: e.target.value };
                              setOpeningHours(updated);
                            }}
                            className="w-32"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Fermeture:</Label>
                          <Input
                            type="time"
                            value={hour.closingTime}
                            onChange={(e) => {
                              const updated = [...openingHours];
                              updated[index] = { ...updated[index], closingTime: e.target.value };
                              setOpeningHours(updated);
                            }}
                            className="w-32"
                          />
                        </div>
                      </>
                    )}
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
            <Card>
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

          <TabsContent value="admin" className="space-y-6">
            <Card>
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