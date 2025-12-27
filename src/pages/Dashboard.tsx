import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Mail, Plus, Newspaper } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace d'administration Horty Coiffure
          </p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nombre de demandes reçues
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Derniers emails et rendez-vous</CardTitle>
              <CardDescription>
                Communications et réservations récentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Demande de Marie Dupont
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Intéressée par une coupe + couleur - Aujourd'hui
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Rendez-vous avec Jean Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Coupe homme - Aujourd'hui 15:30
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Email de Sophie Leroy
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Question sur la pédicure - Hier
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Services les plus consultés</CardTitle>
              <CardDescription>
                Popularité des services cette semaine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Coupe + couleur</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">45 consultations</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm font-medium">Pédicure</span>
                  </div>
                  <span className="text-sm text-muted-foreground">32 consultations</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Coupe homme</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">28 consultations</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Raccourcis rapides</CardTitle>
              <CardDescription>
                Actions fréquentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/admin/services?action=add">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un service
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Newspaper className="mr-2 h-4 w-4" />
                Publier une news
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;