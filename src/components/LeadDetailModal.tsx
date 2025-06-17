import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Mail, 
  Building, 
  MapPin, 
  Calendar,
  Star,
  MessageSquare,
  UserPlus,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import type { Lead } from "@/pages/Index";
import { useEffect, useState } from "react";

interface LeadDetailModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
}

interface DetailedLeadInfo {
  "E-mail": string;
  "First Name": string;
  "Last Name": string;
  linkedin_url?: string;
  title: string;
  "Company name": string;
  "Company website_url"?: string;
  "Company linkedin_url"?: string;
  "created time"?: string;
  state?: string;
  country?: string;
  lead_linkedin_post_data?: string;
  lead_linkedin_company_post_data?: string;
  scraped_company_data?: string;
  "LEAD PROFILING"?: string;
  "Overall Score"?: string;
  VERDICT?: string;
  "Decision-Maker Score"?: string;
  "Business Need Score"?: string;
  "Engagement Potential"?: string;
  "Timing Score"?: string;
  "Scoring Justification"?: string;
  "Email-Status"?: string;
  "Linkedin Connection Request"?: string;
  Id: number;
  "Email-Subject-Line"?: string;
  "linked-post-enum"?: number;
  "Lead-LinkedIn-PostData-DataSetId"?: string;
  "Email-IceBreaker"?: string;
  "url-lead-id"?: number;
  City?: string;
  "Email-Score"?: string;
  isAddedToInstantly?: boolean;
  ModifiedCompanyName?: string;
}

export const LeadDetailModal = ({ lead, isOpen, onClose }: LeadDetailModalProps) => {
  const [detailedLead, setDetailedLead] = useState<DetailedLeadInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && lead) {
      setIsLoading(true);
      const fetchDetailedLead = async () => {
        try {
          const response = await fetch(`https://n8n.vaedrix.com:8443/webhook/load-lead-info/6f78-4ed2-acc3-ad63c1724d39?id=${lead.Id}`);
          const data = await response.json();
          if (data && data.data && Array.isArray(data.data.data) && data.data.data.length > 0) {
            setDetailedLead(data.data.data[0]);
          }
        } catch (error) {
          console.error("Failed to fetch detailed lead info:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetailedLead();
    } else if (!isOpen) {
      setDetailedLead(null); // Clear detailed lead data when modal closes
    }
  }, [isOpen, lead]);

  const getVerdictColor = (verdict: Lead['verdict']) => {
    switch (verdict) {
      case 'hot': return 'bg-red-600/20 text-red-400 border-red-600/30';
      case 'warm': return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
      case 'cold': return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-gray-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Lead Profile</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="text-center text-gray-400">Loading detailed lead information...</div>
          </div>
        ) : detailedLead ? (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-300">
                  {detailedLead['First Name']?.[0]}{detailedLead['Last Name']?.[0]}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    {detailedLead['First Name']} {detailedLead['Last Name']}
                  </h2>
                  {detailedLead.VERDICT && (
                    <Badge className={getVerdictColor(detailedLead.VERDICT.toLowerCase().replace(' lead', '') as Lead['verdict'])}>
                      {detailedLead.VERDICT.toUpperCase()}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>{detailedLead.title} at {detailedLead['Company name']}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{detailedLead['E-mail']}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="mb-2">
                  <div className={`text-3xl font-bold ${getScoreColor(detailedLead['Overall Score'] ? parseInt(detailedLead['Overall Score'].split('/')[0]) : 0)}`}>
                    {detailedLead['Overall Score'] ? parseInt(detailedLead['Overall Score'].split('/')[0]) : '---'}
                  </div>
                  <div className="text-sm text-gray-400">Overall Score</div>
                </div>
                <Progress value={detailedLead['Overall Score'] ? parseInt(detailedLead['Overall Score'].split('/')[0]) : 0} className="w-24 h-2" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gray-700">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600">Overview</TabsTrigger>
                <TabsTrigger value="personalization" className="data-[state=active]:bg-gray-600">Personalization</TabsTrigger>
                <TabsTrigger value="scoringDetails" className="data-[state=active]:bg-gray-600">Scoring Details</TabsTrigger>
                <TabsTrigger value="leadProfiling" className="data-[state=active]:bg-gray-600">AI Lead Profiling</TabsTrigger>
                <TabsTrigger value="linkedin-post-analysis" className="data-[state=active]:bg-gray-600">AI LinkedIn Post Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gray-900 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {detailedLead['Email-Score'] && (
                        <div>
                          <label className="text-sm text-gray-400">Email Score</label>
                          <div className="text-white">{detailedLead['Email-Score']}</div>
                        </div>
                      )}
                      {detailedLead['Email-Status'] && (
                        <div>
                          <label className="text-sm text-gray-400">Email Status</label>
                          <div className="text-white">{detailedLead['Email-Status']}</div>
                        </div>
                      )}
                      {detailedLead.country && (
                        <div>
                          <label className="text-sm text-gray-400">Country</label>
                          <div className="text-white">{detailedLead.country}</div>
                        </div>
                      )}
                      {detailedLead.linkedin_url && (
                        <div>
                          <label className="text-sm text-gray-400">LinkedIn Profile</label>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                            <a href={detailedLead.linkedin_url} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-400 hover:text-blue-300">
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Lead Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {detailedLead['Company website_url'] && (
                        <div>
                          <label className="text-sm text-gray-400">Company Website</label>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                            <a href={detailedLead['Company website_url']} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-400 hover:text-blue-300">
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                      {detailedLead['Company linkedin_url'] && (
                        <div>
                          <label className="text-sm text-gray-400">Company LinkedIn</label>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                            <a href={detailedLead['Company linkedin_url']} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-400 hover:text-blue-300">
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="text-sm text-gray-400">Company Name</label>
                        <div className="text-white">{detailedLead['Company name']}</div>
                      </div>
                      {detailedLead.ModifiedCompanyName && (
                        <div>
                          <label className="text-sm text-gray-400">Modified Company Name</label>
                          <div className="text-white">{detailedLead.ModifiedCompanyName}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="personalization" className="space-y-4">
                <Card className="bg-gray-900 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Email Subject Line</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                      <p className="text-blue-100 italic">
                        {detailedLead['Email-Subject-Line'] || "Subject line is being generated based on research findings and will be available shortly."}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Personalized Icebreaker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                      <p className="text-blue-100 italic whitespace-pre-line">
                        {detailedLead['Email-IceBreaker'] || "Icebreaker is being generated based on research findings and will be available shortly."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scoringDetails" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Card className="bg-gray-900 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Scoring Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {detailedLead['Decision-Maker Score'] && (
                        <div>
                          <label className="text-sm text-gray-400">Decision-Maker Score</label>
                          <div className="text-white">{detailedLead['Decision-Maker Score']}</div>
                        </div>
                      )}
                      {detailedLead['Business Need Score'] && (
                        <div>
                          <label className="text-sm text-gray-400">Business Need Score</label>
                          <div className="text-white">{detailedLead['Business Need Score']}</div>
                        </div>
                      )}
                      {detailedLead['Engagement Potential'] && (
                        <div>
                          <label className="text-sm text-gray-400">Engagement Potential</label>
                          <div className="text-white">{detailedLead['Engagement Potential']}</div>
                        </div>
                      )}
                      {detailedLead['Timing Score'] && (
                        <div>
                          <label className="text-sm text-gray-400">Timing Score</label>
                          <div className="text-white">{detailedLead['Timing Score']}</div>
                        </div>
                      )}
                      {detailedLead['Scoring Justification'] && (
                        <div>
                          <label className="text-sm text-gray-400">Scoring Justification</label>
                          <div className="text-white whitespace-pre-wrap max-h-32 overflow-y-auto">
                            {detailedLead['Scoring Justification']}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="leadProfiling" className="space-y-4">
                <Card className="bg-gray-900 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Lead Profiling Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {detailedLead['LEAD PROFILING'] ? (
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="text-white whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
                          {detailedLead['LEAD PROFILING']}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400">No lead profiling information available.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="linkedin-post-analysis" className="space-y-4">
                <Card className="bg-gray-900 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">LinkedIn Post Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {detailedLead.lead_linkedin_post_data ? (
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <div className="text-white whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
                          {detailedLead.lead_linkedin_post_data}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400">No LinkedIn post data available for this lead.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <div className="text-center text-gray-400">No detailed lead information available.</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
