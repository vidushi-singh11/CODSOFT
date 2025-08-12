import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            A beautifully crafted calculator with modern design and smooth interactions
          </p>
        </div>
        
        <Calculator />
        
        <div className="text-sm text-muted-foreground">
          Built with React, TypeScript & Tailwind CSS
        </div>
      </div>
    </div>
  );
};

export default Index;
