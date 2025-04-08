import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useAuth } from "../../auth/use-auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();

  const { logout, username } = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grow">
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <nav className="bg-gray-800 text-white p-4 sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-white cursor-pointer" />
                <div className="font-bold text-xl">Company Logo</div>
              </div>
              <div className="flex items-center gap-4">
                <span>user:{username || "guest"}</span>
                <button
                  onClick={async () => {
                    await logout();

                    await router.invalidate();

                    navigate({ to: "/" });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <div className="container mx-auto p-4 flex-grow">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
