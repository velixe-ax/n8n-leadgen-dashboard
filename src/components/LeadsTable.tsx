import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowUpDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Task, Lead } from "@/pages/Index";

interface LeadsTableProps {
  task: Task;
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
}

export const LeadsTable = ({ task, leads, onLeadSelect }: LeadsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("all");
  const [instantlyFilter, setInstantlyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 20;

  // Remove mock data - leads will be passed via props
  // const mockLeads: Lead[] = [ ... ];

  const getVerdictColor = (verdict: Lead['verdict']) => {
    switch (verdict) {
      case 'hot': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warm': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'cold': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-gray-400';
  };

  const filteredAndSortedLeads = leads
    .filter(lead => {
      const searchTermLower = searchTerm.toLowerCase();
      const firstName = (lead.firstName || '').toLowerCase();
      const lastName = (lead.lastName || '').toLowerCase();
      const companyName = (lead.companyName || '').toLowerCase();

      const matchesSearch = 
        firstName.includes(searchTermLower) ||
        lastName.includes(searchTermLower) ||
        companyName.includes(searchTermLower);
      
      const matchesVerdict = verdictFilter === "all" || lead.verdict === verdictFilter;
      const matchesInstantly = instantlyFilter === "all" || 
        (instantlyFilter === "added" && lead.isAddedToInstantly) ||
        (instantlyFilter === "not-added" && !lead.isAddedToInstantly);
      
      return matchesSearch && matchesVerdict && matchesInstantly;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Lead];
      const bValue = b[sortBy as keyof Lead];
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const paginatedLeads = filteredAndSortedLeads.slice(startIndex, startIndex + leadsPerPage);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 p-4">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-white text-2xl">Leads ({filteredAndSortedLeads.length})</CardTitle>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-2 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <Select value={verdictFilter} onValueChange={setVerdictFilter}>
            <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Filter by verdict" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600 text-white text-base rounded-lg shadow-lg">
              <SelectItem value="all" className="text-white text-base py-2">All Verdicts</SelectItem>
              <SelectItem value="hot" className="text-white text-base py-2">Hot</SelectItem>
              <SelectItem value="warm" className="text-white text-base py-2">Warm</SelectItem>
              <SelectItem value="cold" className="text-white text-base py-2">Cold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={instantlyFilter} onValueChange={setInstantlyFilter}>
            <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Filter by Instantly" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600 text-white text-base rounded-lg shadow-lg">
              <SelectItem value="all" className="text-white text-base py-2">All Leads</SelectItem>
              <SelectItem value="added" className="text-white text-base py-2">Added to Instantly</SelectItem>
              <SelectItem value="not-added" className="text-white text-base py-2">Not Added to Instantly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="rounded-lg border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50 bg-gray-700">
                <TableHead className="text-gray-300 text-sm py-3 px-4">ID</TableHead>
                <TableHead 
                  className="text-gray-300 text-sm cursor-pointer hover:text-white py-3 px-4"
                  onClick={() => handleSort('firstName')}
                >
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-300 text-sm py-3 px-4">Email</TableHead>
                <TableHead className="text-gray-300 text-sm py-3 px-4">Position</TableHead>
                <TableHead className="text-gray-300 text-sm py-3 px-4">Company</TableHead>
                <TableHead 
                  className="text-gray-300 text-sm cursor-pointer hover:text-white py-3 px-4"
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center">
                    Score
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-gray-300 text-sm py-3 px-4">Verdict</TableHead>
                <TableHead className="text-gray-300 text-sm py-3 px-4">Instantly</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow 
                  key={lead.Id}
                  className="border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                  onClick={() => onLeadSelect(lead)}
                >
                  <TableCell className="text-gray-400 text-sm py-3 px-4">#{lead.Id}</TableCell>
                  <TableCell className="py-3 px-4">
                    <div>
                      <div className="font-medium text-white text-base">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm py-3 px-4">{lead.email}</TableCell>
                  <TableCell className="text-gray-300 text-sm py-3 px-4">{lead.title}</TableCell>
                  <TableCell className="text-gray-300 text-sm py-3 px-4">{lead.companyName}</TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="space-y-1">
                      <div className={`font-bold text-base ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </div>
                      <Progress value={lead.score} className="h-1 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge className={getVerdictColor(lead.verdict)}>{lead.verdict.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge className={lead.isAddedToInstantly ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}>
                      {lead.isAddedToInstantly ? "Added" : "Not Added"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-2 pt-6">
            <Button 
              variant="outline" 
              size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 text-sm py-2 px-4"
            >
              Previous
            </Button>
          <span className="text-base text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
            <Button 
              variant="outline" 
              size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 text-sm py-2 px-4"
            >
              Next
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
