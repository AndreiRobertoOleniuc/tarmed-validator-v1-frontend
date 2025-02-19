import { useLocalSearchParams } from "expo-router";
import { View, SafeAreaView } from "react-native";
import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import { selectDocumentById } from "@/store/selectors/documentSelectors";

import { Secrets } from "~/Secrets";

import ImageSlider from "@/components/DetailScreen/ImageSlider";
import SummaryList from "@/components/DetailScreen/SummaryList";
import { Text } from "@/components/nativewindui/Text";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const document = useAppSelector(selectDocumentById(id as string));
  const [isFitMode, setIsFitMode] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!document || !document.scanResponse) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center items-center">
          <Text className="text-foreground">Document not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { summaries } = document.scanResponse;
  let photoUri: string[] = document.documemtImages.map((img) => img.uri);
  if (Secrets.imageSimulatorMode) {
    photoUri = [
      "https://storage.googleapis.com/exercise-app-assets/imageV2.2.jpg",
      "https://storage.googleapis.com/exercise-app-assets/imageV2.1.jpg",
    ];
  }
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < photoUri.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View>
        <Text className="text-xl font-bold text-left p-4">{document.name}</Text>
      </View>

      <ImageSlider
        images={photoUri}
        currentIndex={currentImageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        isFitMode={isFitMode}
        toggleFitMode={() => setIsFitMode(!isFitMode)}
      />
      {isFitMode && (
        <SummaryList
          summaries={summaries.map((summary, index) => ({
            ...summary,
            documentId: document.id,
            id: index.toString(), // use the index instead of summary.titel
          }))}
        />
      )}
    </SafeAreaView>
  );
}
