import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Package, MessageSquare, Settings, Eye } from "lucide-react";
import AdminLayout from "@/layout/AdminLayout";
import { useServices } from "@/features/services/hooks/useServices";
import { useTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useFeedbacks } from "@/features/feedbacks/hooks/useFeedbacks";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { services } = useServices();
  const { testimonials } = useTestimonials();
  const { products } = useProducts();
  const { feedbacks } = useFeedbacks();
  const [visitCount, setVisitCount] = useState(0);

  const unreadFeedbacks = feedbacks.filter(f => f.status === 'unread').length;
  const recentFeedbacks = feedbacks.filter(f => f.status === 'unread').slice(-3).reverse();

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        // Utilisation de CountAPI pour compter les visites
        const response = await fetch('https://api.countapi.xyz/get/horty-coiffure/visits');
        const data = await response.json();
        setVisitCount(data.value);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de visites:', error);
        setVisitCount(0);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace d'administration Horty Coiffure
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visites
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Visiteurs totaux
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prestations actives
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.length}</div>
              <p className="text-xs text-muted-foreground">
                Services disponibles
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Témoignages
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonials.length}</div>
              <p className="text-xs text-muted-foreground">
                Avis clients approuvés
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produits
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Produits en vente
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Feedbacks
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbacks.length}</div>
              <p className="text-xs text-muted-foreground">
                {unreadFeedbacks} non lus
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Derniers feedbacks */}
        <Card>
          <CardHeader>
            <CardTitle>Feedbacks non lus</CardTitle>
            <CardDescription>
              Avis et commentaires récents non encore consultés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedbacks.map((feedback) => (
                <div key={feedback.id} className="flex items-start space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{feedback.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {feedback.comment}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(feedback.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
              {recentFeedbacks.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucun feedback récent</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
