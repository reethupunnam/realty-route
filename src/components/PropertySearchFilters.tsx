
import { useState } from "react";
import { PropertyFilters, PropertyType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";

interface PropertySearchFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

const PropertySearchFilters = ({ onFilterChange }: PropertySearchFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFilters>({});

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };

    // Remove undefined or empty string values
    Object.keys(newFilters).forEach(k => {
      const filterKey = k as keyof PropertyFilters;
      if (newFilters[filterKey] === undefined || newFilters[filterKey] === '') {
        delete newFilters[filterKey];
      }
    });

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border">
      <div className="md:hidden mb-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Search Filters</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {renderFilterContent()}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="hidden md:block">
        {renderFilterContent()}
      </div>
    </div>
  );

  function renderFilterContent() {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min Price"
              min={0}
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max Price"
              min={0}
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <Label htmlFor="minBedrooms">Bedrooms</Label>
            <Select 
              value={filters.minBedrooms?.toString() || ''}
              onValueChange={(value) => handleFilterChange('minBedrooms', value ? Number(value) : undefined)}
            >
              <SelectTrigger id="minBedrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="minBathrooms">Bathrooms</Label>
            <Select 
              value={filters.minBathrooms?.toString() || ''}
              onValueChange={(value) => handleFilterChange('minBathrooms', value ? Number(value) : undefined)}
            >
              <SelectTrigger id="minBathrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div>
            <Label htmlFor="propertyType">Property Type</Label>
            <Select 
              value={filters.propertyType?.toString() || ''}
              onValueChange={(value) => handleFilterChange('propertyType', value as PropertyType || undefined)}
            >
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="City"
              value={filters.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="State (e.g. CA)"
              value={filters.state || ''}
              onChange={(e) => handleFilterChange('state', e.target.value || undefined)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </>
    );
  }
};

export default PropertySearchFilters;
