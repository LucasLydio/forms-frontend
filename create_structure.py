import os

STRUCTURE = {
    "src": {
        "app": {
            "providers": ["AppProviders.tsx"],
            "router": ["routes.tsx"],
            "layout": ["AppLayout.tsx"],
            "guards": ["ProtectedRoute.tsx"],
            "config": ["env.ts"],
        },
        "shared": {
            "ui": [],
            "components": [],
            "hooks": [],
            "lib": {
                "api": ["http.ts", "types.ts"],
                "utils": ["cn.ts", "reorder.ts"],
            },
            "types": ["index.ts"],
        },
        "features": {
            "auth": {
                "api": ["auth.api.ts"],
                "model": ["auth.types.ts", "auth.store.ts"],
                "ui": ["LoginForm.tsx", "RegisterForm.tsx"],
                "pages": ["LoginPage.tsx", "RegisterPage.tsx"],
            },
            "forms": {
                "api": ["forms.api.ts", "submissions.api.ts"],
                "model": ["forms.types.ts", "forms.queries.ts"],
                "ui": [
                    "FormCard.tsx",
                    "FormsBuckets.tsx",
                    "FormBuilderModal.tsx",
                    "DraggableList.tsx",
                ],
                "pages": [
                    "FormsListPage.tsx",
                    "FormViewPage.tsx",
                    "FormBuilderPage.tsx",
                    "FormAnswerPage.tsx",
                ],
            },
            "admin-users": {
                "api": ["users.api.ts"],
                "model": ["users.queries.ts", "users.types.ts"],
                "pages": ["AdminUsersPage.tsx"],
            },
        },
        "pages": ["IndexPage.tsx", "NotFoundPage.tsx"],
        "main.tsx": None,
        "App.tsx": None,
        "index.css": None,
    }
}


def create_structure(base_path, tree):
    for name, content in tree.items():
        path = os.path.join(base_path, name)

        if content is None:
            # File
            open(path, "a").close()
        elif isinstance(content, list):
            # Folder with files
            os.makedirs(path, exist_ok=True)
            for file in content:
                open(os.path.join(path, file), "a").close()
        elif isinstance(content, dict):
            # Folder with nested structure
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)


if __name__ == "__main__":
    create_structure(".", STRUCTURE)
    print("✅ Project structure created successfully!")
