# GitHub Copilot Instructions for Next.js E-commerce Application

## Project Overview
This is a Next.js e-commerce application using the App Router architecture. Follow these guidelines when generating code.

## Technology Stack
- **Framework**: Next.js 14+ with App Router (app directory)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI) or Chakra UI
- **State Management**: React Context API
- **Runtime**: Node.js

## File Structure & Organization

### Directory Structure
Organize files by type in the following structure:
```
/app                    # Next.js App Router pages and layouts
/components            # Reusable UI components
/hooks                 # Custom React hooks
/utils                 # Utility functions and helpers
/lib                   # Third-party library configurations
/types                 # TypeScript type definitions
/contexts              # React Context providers
/public                # Static assets
/styles                # Global styles and Tailwind config
```

### Naming Conventions
- **Component files**: PascalCase (e.g., `ProductCard.tsx`, `CheckoutForm.tsx`)
- **Utility files**: camelCase (e.g., `formatPrice.ts`, `validateEmail.ts`)
- **Hook files**: camelCase with 'use' prefix (e.g., `useCart.ts`, `useAuth.ts`)
- **Type files**: PascalCase (e.g., `Product.ts`, `User.ts`)
- **Context files**: PascalCase with 'Context' suffix (e.g., `CartContext.tsx`)

## Code Style & Patterns

### TypeScript
- Always use TypeScript with strict mode
- Define explicit types for all props, function parameters, and return values
- Use interfaces for object shapes, types for unions/intersections
- Avoid `any` type; use `unknown` if type is truly unknown
- Create separate type definition files in `/types` for shared types

Example:
```typescript
interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductProps> = ({ id, name, price, imageUrl }) => {
  // Component implementation
};
```

### Components
- **Default to Server Components** for all components in the app directory
- Only add `"use client"` directive when component needs:
  - React hooks (useState, useEffect, etc.)
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs
  - Context consumers
- Keep Server Components as the default; explicitly mark Client Components
- Use React.FC type for functional components
- Keep components focused and single-responsibility

Example Server Component:
```typescript
// No "use client" needed
export default async function ProductList() {
  const products = await fetchProducts();
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

Example Client Component:
```typescript
"use client";

import { useState } from "react";

export const AddToCartButton: React.FC<{ productId: string }> = ({ productId }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Implementation
};
```

### Styling with Tailwind CSS
- Use Tailwind utility classes for styling
- Follow mobile-first responsive design (sm, md, lg, xl breakpoints)
- Use MUI/Chakra UI components styled with Tailwind when possible
- Keep custom CSS minimal; prefer Tailwind utilities
- Use consistent spacing scale (p-4, m-2, gap-6, etc.)

Example:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
  <ProductCard />
</div>
```

### State Management with Context
- Use React Context for global state (cart, user, theme)
- Create separate contexts for different concerns
- Provide contexts at appropriate levels (not always at root)
- Use custom hooks to consume contexts

Example:
```typescript
// contexts/CartContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  // Implementation
};
```

### E-commerce Specific Patterns

#### Product Pages
- Use dynamic routes: `/app/products/[id]/page.tsx`
- Implement proper metadata for SEO
- Show loading states during data fetching
- Handle out-of-stock products gracefully

#### Cart Functionality
- Persist cart state (localStorage or cookies)
- Show cart count in navigation
- Implement optimistic UI updates
- Validate stock availability before checkout

#### Checkout Flow
- Multi-step forms with validation
- Show order summary at each step
- Implement proper error handling
- Use loading states during payment processing

## API Routes & Data Fetching

### Server-Side Data Fetching
- Fetch data directly in Server Components
- Use native fetch with Next.js caching strategies
- Handle errors with error.tsx boundaries

Example:
```typescript
async function getProduct(id: string) {
  const res = await fetch(`${process.env.API_URL}/products/${id}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
```

### API Routes
- Place in `/app/api` directory
- Use Route Handlers (route.ts files)
- Return proper HTTP status codes
- Implement error handling

Example:
```typescript
// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
```

## Performance Optimization
- Use Next.js Image component for all images
- Implement proper lazy loading
- Use dynamic imports for heavy components
- Optimize bundle size with proper code splitting
- Implement proper caching strategies

## Error Handling
- Use error.tsx for route-level error boundaries
- Provide user-friendly error messages
- Log errors appropriately
- Implement fallback UI for failed states

## Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Add alt text to all images

## Comments & Documentation
- Add JSDoc comments for complex functions
- Document props with TSDoc comments
- Explain business logic in comments
- Keep comments concise and meaningful

## Testing Considerations
- Write testable, pure functions
- Keep business logic separate from UI
- Use dependency injection where appropriate
- Structure code to be easily mockable

## Security Best Practices
- Validate all user inputs
- Sanitize data before rendering
- Use environment variables for sensitive data
- Implement proper authentication checks
- Use HTTPS for all API calls

## Git Commit Messages
- Use conventional commits format
- Be descriptive but concise
- Reference issue numbers when applicable

Examples:
- `feat: add product filtering by category`
- `fix: resolve cart total calculation bug`
- `style: update product card layout`

---

When in doubt, prioritize:
1. Type safety
2. Performance
3. User experience
4. Code readability
5. Maintainability